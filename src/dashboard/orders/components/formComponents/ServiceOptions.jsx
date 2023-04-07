import React, { useEffect, useState } from 'react'
import { getAllServices } from '../../../../api/orders/service'
import { SelectInputContainer } from '../../../../components/form'
import { SERVICES } from '../../../../utils/constants'

export const ServiceOptions = ({value, setValue, disabled}) => {
  const servicesInSS = JSON.parse(sessionStorage.getItem(SERVICES) || "[]")
  const [services, setServices] = useState(servicesInSS)

  useEffect(() => {
    getAllServices()
      .then(response => setServices(response))
  }, [])
  
  return (
    <SelectInputContainer
      name="service"
      text="Service"
      required={true}
      value={value}
      setValue={setValue}
      disabled={disabled}
    >
      <option value="">-- Service --</option>
      {
        services.map(service => (
          <option value={service.name} key={service._id}>{service.name}</option>
        ))
      }
      <option value="other">Other</option>
    </SelectInputContainer>
  )
}
