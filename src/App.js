import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect,useState } from 'react';

function App() {
  const [data,setData] = useState([]);
  const [jsondata,setJsonData] = useState([]);

  const sumunit = (data) =>{
    let sum = 0
    for(let i= 0;i<data.length;i++)
    {
      sum += data[i].attributes.unitPrice
    }
    return sum;
  }

  const sumstock = (data) =>{
    let sum = 0
    for(let i= 0;i<data.length;i++)
    {
      sum += data[i].attributes.stock
    }
    return sum;
  }

  const createjson = (data) =>{
    return JSON.stringify(jsondata)

    /*
    let dataobject = [];
    dataobject = data.map((val)=>{
  
      return {
        id:val.id,
        attributes:{
        sku:val.attributes.sku,
        barcode:val.attributes.barcode,
        description:val.attributes.description,
        productName:val.attributes.productName,
        unitPrice:val.attributes.unitPrice,
        recommended:val.attributes.recommended,
        thcLevel:val.attributes.thcLevel,
        cbdLevel:val.attributes.cbdLevel,
        stock:val.attributes.stock,
        unit:val.attributes.unit,
        createdAt:val.attributes.createdAt
      }
    }
    })
    return JSON.stringify(dataobject)
    */
  }

  const onlyrecommed = (data) =>{
    let result = []
    result = data.filter((val)=>{
      console.log(val.attributes.recommended)
      return val.attributes.recommended === true
    })
    return JSON.stringify(result)
  }


  const recommedandnon = (data) =>{
    let countrec = 0;
    let countnonrec = 0;

    let resultrec = data.filter((val)=>{
      return val.attributes.recommended === true
    }).reduce((sum,val)=>{
      if(val.attributes.recommended === true)
      {
        countrec += 1;
      }
      return sum+val.attributes.stock
    },0)

    let resultnonrec = data.filter((val)=>{
      return val.attributes.recommended === false
    }).reduce((sum,val)=>{
      if(val.attributes.recommended === false)
      {
        countnonrec += 1;
      }
      return sum+val.attributes.stock
    },0)

    const ans = {
      "recommended" : {
      "totalStock" : resultrec,
      "count" : countrec
    },"non-recommended" : {
      "totalStock" : resultnonrec,
      "count" : countnonrec
    }
  }
    return JSON.stringify(ans)
  }

  const mostexpensive = (data) =>{
    
  }

  
  useEffect(()=>{
    axios.get("https://api.budz.co/api/products?populate=*&pagination[pageSize]=100").then(res=>{
      setData(res.data.data)

      let dataobject = res.data.data.map((val)=>{
        return {
          id:val.id,
          attributes:{
          sku:val.attributes.sku,
          barcode:val.attributes.barcode,
          description:val.attributes.description,
          productName:val.attributes.productName,
          unitPrice:val.attributes.unitPrice,
          recommended:val.attributes.recommended,
          thcLevel:val.attributes.thcLevel,
          cbdLevel:val.attributes.cbdLevel,
          stock:val.attributes.stock,
          unit:val.attributes.unit,
          createdAt:val.attributes.createdAt
        }
      }
  
      })
      setJsonData(dataobject)
    })
    
      

  },[])
  
  return (
    <div className="App">
      <h1>Answer the following questions</h1>
      <h2>a. How many objects are in the array?</h2>
      <h3>Answer is {data.length}</h3>
      <h2>b. What is the sum of unitPrice?</h2>
      <h3>Answer is {sumunit(data)}</h3>
      <h2>c. What is the sum of stock?</h2>
      <h3>Answer is {sumstock(data)}</h3>
      <h2>d. Use the response to generate JSON array with the following attributes</h2>
      <h3>Answer is {createjson(data)}</h3>
      <h2>e. Use the JSON from (d) to get only recommended items JSON array</h2>
      <h3>Answer is {onlyrecommed(jsondata)}</h3>
      <h2>f. Use the JSON from (d) to sum count of items separated by recommended and nonrecommended</h2>
      <h3>Answer is {recommedandnon(jsondata)}</h3>
      <h2>g. Use the JSON from (d) find the most expensive product (get only most expensive productobject)</h2>
      <h3>Answer is {mostexpensive(jsondata)}</h3>

      
    </div>
  );
}

export default App;
