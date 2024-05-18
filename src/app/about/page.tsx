  "use client"
  export default function AboutPage(){
    const listLocations=[
    {name:"101market",address:"Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900",contact:["093 808 3xxx","02 015 2xxx","093 810 8xx"],contact1:"02 015 2xxx",Openhours:"9 am - 8 pm",img:"https://manoonpetshop.com/upload-img/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2/%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_1.jpg"},
    {name:"102market",address:"Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900",contact:["093 808 3xxx","093 810 8xx"],contact1:"02 015 2xxx",contact3:"02 015 2xxx",Openhours:" 10 am - 8 pm",img:"https://manoonpetshop.com/upload-img/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2/%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_1.jpg"},
    {name:"103market",address:"Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900",contact:["093 809 xxxx"],Openhours:"10 am - 8:30 pm",img:"https://manoonpetshop.com/upload-img/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2/%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_1.jpg"},
    {name:"104market",address:"Market 101 Phahonyothin Rd, Chatuchak, Bangkok 10900",contact:["093 808 3xxx"],Openhours:" 10:30 am - 8:30 pm",img:"https://manoonpetshop.com/upload-img/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2/%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_1.jpg"},
 ]
    
    const card=listLocations.map((Branch) => { 
        const contact=Branch.contact.map(
            (Contact)=>{
                return(
    
                        <h3 key={Contact}>{Contact}</h3>
    
                )
            }
        )
        
        
        
        return(
          <div key={Branch.name} className={"Aboutcard"}>
            
          <h2>{Branch.name}s</h2>

          <div>
              <h4>
                  Address
              </h4>
              <h4>
                  {Branch.address}
              </h4>
          </div>

          <div>
              <h4>Contact</h4>
              <h4>{contact}</h4>
          </div>
          <div>    
              <h4>Open Hours</h4> 
              <h4>{Branch.Openhours}</h4>
          </div>
          <img src="https://manoonpetshop.com/upload-img/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B8%B2%E0%B8%82%E0%B8%B2/%E0%B8%94%E0%B8%AD%E0%B8%99%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87_1.jpg"  alt="harry potter" width="500" height="300"/>

      </div>
        )
    
    }
    
    )
        return(
        
            <div key="navigation">
    <h1 className="text-4xl font-bold text-start text-gray-700 my-3">About Us</h1>
    
      {card}
        </div>
      )
  }
