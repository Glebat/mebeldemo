async function getall() {
  const client = global.dbclient
  const [producttype, product, workshops, productworkshops, materialtype] = await Promise.all([
    client.query('SELECT * FROM product_type'),
    client.query('SELECT * FROM product'),
    client.query('SELECT * FROM workshops'),
    client.query('SELECT * FROM product_workshops'),
    client.query('SELECT * FROM material_type')
  ])
  return {
    producttype: producttype.rows,
    product: product.rows,
    workshops: workshops.rows,
    productworkshops: productworkshops.rows,
    materialtype: materialtype.rows
  }
}

ipcMain.handle('getalldb', getall),



getalldb: (data) => ipcRenderer.invoke('getalldb', data)


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
      JSON.stringify(result, null, 2)
    })
  },[])


