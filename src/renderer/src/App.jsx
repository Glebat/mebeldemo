import { useEffect, useState } from 'react'
import electronLogo from './assets/electron.svg'
import logo from '../../../resources/logo.png'


function App() {
  const [data, setData] = useState({
    producttype:[],
    product:[],
    workshops:[],
    productworkshops:[],
    materialtype:[]
  })
  
  useEffect(() =>{
    window.api.getalldb().then(result => {
      setData(result)
      console.log(result)
    })
  },[])

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
      <img src={logo} alt="logo" style={{width: '100px', height: '100px'}}/>
      <p>Изготовление и продажа мебели</p>
      </div>
    <div>
      
      {data.product.map((pr) => {
        // Находим связанные данные
        const type = data.producttype.find(t => t.product_type_id === pr.product_type_name_product_id)
        const material = data.materialtype.find(m => m.material_type_id === pr.product_material_id)
        
        // Считаем общее время изготовления
        const totalTime = Math.ceil(
          data.productworkshops
            .filter(pw => pw.product_workshops_name_prod_id === pr.product_id)
            .reduce((sum, pw) => sum + pw.product_workshops, 0)
        )
        
        return (
          <div key={pr.product_id} style={{
            border: '1px solid black',
            padding: '15px',
            margin: '10px',
            maxWidth: '600px',
            fontFamily:'Candara',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <div>{type?.product_type_name} | {pr.product_name}</div>
              <div>{pr.product_articl}</div>
              <div>{pr.product_min_sum}</div>
              <div>{material?.material_type_name}</div>
            </div>
            <div style={{
              marginLeft: '20px',
              display: 'flex',
              alignItems: 'center'
            }}>
              Время изготовления: {totalTime}
            </div>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default App

