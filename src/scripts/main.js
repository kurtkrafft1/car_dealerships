import apiManager from './apimanager.js';
function removeDuplicates(array) {
  return array.filter((a, b) => array.indexOf(a) === b)
}

const getAssortedData = {
    get17Profits: () => {
        apiManager.getCarData()
        .then(arr=>
            {const newArr =[]
             arr.forEach(obj=> newArr.push(obj.gross_profit))
            const sum = newArr.reduce((acc,crv)=>acc+crv)
            console.log(sum)
        })
    }, getMaxMonth: () => {
      apiManager.getCarData()
      .then(arr=> {
        const monthNSales = [
          {month: "january",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='01').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "february",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='02').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "march",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='03').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "april",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='04').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "may",
           sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='05').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "june",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='06').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "july",
           sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='07').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "august",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='08').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "september",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='09').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "november",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='11').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          },
          {
          month: "december",
          sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='12').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
          }
        ]
        const salesArr = monthNSales.map(obj=> obj.sales)
        let highestSale = 0;
        salesArr.forEach(num=> {
          if(num>highestSale){
            highestSale=num;
          }
        })
       const biggestMonth = monthNSales.filter(obj=> obj.sales===highestSale)
       console.log(biggestMonth[0].month)
        
      })
    },
    getMostCarsSold: () => {
      apiManager.getCarData()
          .then(arr => {
            const lastNames = arr.map(obj=> obj.sales_agent["last_name"])
            const newObj =removeDuplicates(lastNames)
            const names = []
            // console.log(newObj)
            for(let i = 0; i<newObj.length;i++){
              const arr = lastNames.filter(name => name===newObj[i]);
              const obj = {
                name: newObj[i],
                sales: arr.length
              }
              names.push(obj);

            }
            let mostSales = 0;
            names.forEach(person=> {
              if(person.sales>mostSales){
                mostSales = person.sales;
              }
            })
            console.log(names)
            const winner =names.filter(person => person.sales === mostSales)
            console.log(winner);
            const fullWinner = arr.filter(obj=> obj.sales_agent["last_name"]===winner[0].name)
            console.log(fullWinner);
          })
    },
      getBestSalesmanOrWoman: () => {
        apiManager.getCarData()
          .then(arr => {
            const lastNames = arr.map(obj=> obj.sales_agent["last_name"])
              const newObj = removeDuplicates(lastNames);
              // console.log(newObj)
              const salesByName = [];
              for(let i =0;i<newObj.length;i++){
                const array = arr.filter(obj=> obj.sales_agent["last_name"]===newObj[i])
                salesByName.push(array)
              }
              const newArr = [];
              salesByName.forEach(arr=> {
                const sales = arr.map(obj=> obj.gross_profit).reduce((acc, crv)=> acc+crv);
                const newObj = {
                  name: arr[0].sales_agent["last_name"],
                  totalSales: sales
                }
                newArr.push(newObj);
              })
              let highestSale = 0;
              newArr.forEach(salesman=> {
                if(salesman.totalSales>highestSale){
                  highestSale = salesman.totalSales;
                }
              })
              const winner = newArr.filter(salesman=> salesman.totalSales===highestSale)
              console.log(winner[0]);
              console.log(newArr)

              
          })
      },
      getMostPopularCar () {
        apiManager.getCarData()
          .then(arr => {
            const mappedArr = arr.map(obj=> obj.vehicle.model);
            // console.log(mappedArr)
            const newarr = removeDuplicates(mappedArr);
            const objArr = [];
            newarr.forEach(name=> {
              const obj = {
                model: name,
                sales: mappedArr.filter(model=> model===name).length
              }
              objArr.push(obj)
            })
            let mostSold = 0;
            objArr.forEach( car => {
              if(car.sales>mostSold){
                mostSold= car.sales;
              }})
              const carSold = objArr.filter(car=> car.sales===mostSold);
              console.log(carSold)
          })
      }, 
      bestBank () {
        apiManager.getCarData()
          .then(arr => {
            const newArr = arr.map(car=> car.credit['credit_provider'])
            const unique = removeDuplicates(newArr);
            const objArr = [];
            unique.forEach(name => {
                const obj = {
                  bank: name,
                  loans: newArr.filter(banks=> banks===name).length
                }
                objArr.push(obj);

              })
              let mostLoans = 0;
              objArr.forEach(bank => {
                if(bank.loans>mostLoans){
                  mostLoans = bank.loans
                }
              })
              const winner = objArr.filter(bank => bank.loans === mostLoans)
              console.log(winner)
          })

      },
      getZeroMonth: () => {
        apiManager.getCarData()
        .then(arr=> {
          const monthNSales = [
            {month: "january",
              sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='01').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "february",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='02').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "march",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='03').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "april",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='04').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "may",
             sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='05').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "june",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='06').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "july",
             sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='07').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "august",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='08').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "september",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='09').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },{
              month:"october",
              sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='10').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv, 0),
            },
            {
            month: "november",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='11').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            },
            {
            month: "december",
            sales: arr.filter(obj=> obj["purchase_date"].split('-')[1]==='12').map(obj=> obj.gross_profit).reduce((acc,crv) => acc+crv)
            }
          ]
          const salesArr = monthNSales.map(obj=> obj.sales)
          let zeroSale = 0;
          console.log(monthNSales)
         const zeroMonth = monthNSales.filter(obj=> obj.sales===zeroSale)
         console.log(zeroMonth[0].month)
          
        })
      }

    }

// getAssortedData.bestBank();
// getAssortedData.getBestSalesmanOrWoman();
// getAssortedData.getBestSalesmanOrWoman();
// getAssortedData.getMostPopularCar();
// getAssortedData.getMostCarsSold();
// getAssortedData.get17Profits();
getAssortedData.getZeroMonth();
// .forEach(obj=> console.log(obj.gross_profit))
// .reduce((acc,crv)=> acc+crv)
// .filter(obj=> obj.gross_profit).reduce((acc,crv)=> acc+crv);


