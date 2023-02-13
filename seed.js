const { PrismaClient }  =  require('@prisma/client')


const prisma = new PrismaClient()

async function main(){
    /*let nyc = await prisma.airports.create({data : {
        code : 'JFK',
        city : 'New York'
    }})
    let la = await prisma.airports.create({data : {
        code : 'LAX',
        city : 'Los Angeles'
    }})
    console.log(la,nyc)


    let nycToLA = await prisma.flights.create({
        data : {
           origin_id:nyc.id,
           
           destination_id:la.id,
            duration : 415
        }
    })
    let laToNYC = await prisma.flights.create({
        data : {
           origin_id:la.id,
           destination_id:nyc.id,
            duration : 315
        }
    })
    */
    console.log(await prisma.flights.findMany({
        include :{
            origin : true,
            destination : true
        },
        where: {
            duration: {
                gt: 400,
            }
          },
    }))
}


main().then(()=>{
    prisma.$disconnect()
})
.catch(err=>{
    console.log(err)
    prisma.$disconnect()
})