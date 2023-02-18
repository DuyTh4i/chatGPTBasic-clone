'use client'

import { collection, orderBy, query } from "firebase/firestore";
import { signOut, useSession } from "next-auth/react"
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat"

function SideBar() {
  const {data: sesison} = useSession()

  const [chats, loading, error] = useCollection( 
    sesison && query(
      collection(db, "users", sesison.user?.email!, "chats"), 
      orderBy("createdAt", "asc"))
      )

  return (
    <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
          <div>
            <NewChat/>
              <div className="hidden sm:inline">
                  <ModelSelection/>
              </div>

              <div className="flex flex-col space-y-2 my-2">
                  {loading && (
                    <div className="animate-pulse text-center text-white"><p>Loading chat...</p></div>
                  )}

                {chats?.docs.map(chat => (
                  <ChatRow key={chat.id} id={chat.id}/>
                ))}
              </div>
          </div>
        </div>
        {sesison && <img onClick={() => signOut()} src={sesison.user?.image!} alt="Profile picture"
        className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-5"/>}
    </div>
  )
}

export default SideBar