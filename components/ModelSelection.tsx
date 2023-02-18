'use client'
import userSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/getEngines').then((res) => res.json())
console.log(fetchModels)

function ModelSelection() {
    const {data: models, isLoading} = userSWR("models", fetchModels)
    const {data: model, mutate: setModel} = userSWR("model", {
        fallbackData: "text-davinci-003"
    })
    return (
        <div className='mt-2'>
            <Select className='mt-2' 
            options={models?.modelOptions}
            defaultValue={model}
            placeholder={model}
            isSearchable 
            isLoading={isLoading} 
            menuPosition="fixed" 
            classNames={{
                control: (state) => "bg-[#434654] border-[#434654]"
            }}
            onChange={(e) => setModel(e.value)}/>
        </div>
    )
}

export default ModelSelection