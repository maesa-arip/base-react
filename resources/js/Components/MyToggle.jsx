import { useState, Fragment } from 'react'
import { Switch } from '@headlessui/react'

export default function MyToggle({name,value,defaultChecked, onChange, enabled,setEnabled}) {

  return (
    <Switch checked={enabled} setEnabled={setEnabled}  onChange={onChange} as={Fragment} defaultChecked={defaultChecked}>
      {({ checked }) => (
        <button 
        name={name} value={value}
          className={`${
            checked ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>

    
  )
}