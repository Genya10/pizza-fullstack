import { categories, ingredients, products } from './constants'
import { prisma } from './prisma-client'
import { hashSync } from 'bcrypt'

async function up(){
 await prisma.user.createMany({
    data:[
        {
            fullName:'User Test',
            email:'user@test.com',
            password: hashSync('111111', 10),
            verified: new Date(),
            role:'USER'
        },
        {
            fullName:'Admin Test',
            email:'admin@test.com',
            password: hashSync('111111', 10),
            verified: new Date(),
            role:'ADMIN'
        }
    ]
 })

 await prisma.category.createMany({
    data:categories
 })

 await prisma.ingredient.createMany({
    data: ingredients,
 })

 await prisma.product.createMany({
    data: products
 })
}

async function down(){
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
}

async function main(){
    try {
        await down()
        await up()
    } catch(e){
        console.error(e)
    }
}

main()
.then(async()=> {
    await prisma.$disconnect()
})
.catch(async(e)=> {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})