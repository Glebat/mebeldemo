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


drop table if exists product_type  cascade;
drop table if exists material_type  cascade;
drop table if exists product  cascade;
drop table if exists workshops  cascade;
drop table if exists product_workshops  cascade;

create table product_type(
product_type_id serial primary key,
product_type_name TEXT,
product_type_coefecent NUMERIC(3,2)
);
create table material_type(
material_type_id serial primary key,
material_type_name TEXT,
material_type_procent numeric(3,2)
);

create table product(
product_id serial primary key,
product_type_name_product_id INT,
foreign key (product_type_name_product_id) references product_type(product_type_id),
product_name TEXT,
product_articl INT,
product_min_sum NUMERIC(8,2),
product_material_id INT,
foreign key (product_material_id) references material_type(material_type_id)
);

create table workshops(
workshops_id serial primary key,
workshops_name TEXT,
workshops_cex TEXT,
workshops_people_count int
);

create table product_workshops(
product_workshops_id serial primary key,
product_workshops_name_prod_id INT,
foreign key (product_workshops_name_prod_id) references product(product_id),
product_workshops_name_cex_id INT,
foreign key (product_workshops_name_cex_id) references workshops(workshops_id),
product_workshops NUMERIC(3,2)
);
