import { Context } from "koishi"
import fs from 'fs/promises'
import path from 'path'

export type userInfo = {
  userId: string
  coins: number
  farm_level: number
  farm_status: string
  last_sign_up: Date
  bonus_count: number
}

const filepath = path.join(path.resolve(__dirname, '..'), 'data')

const defaultUser: userInfo = {
  userId: null,
  coins: 0,
  farm_level: 1,
  farm_status: '0',
  last_sign_up: null,
  bonus_count: 0
}

/** 路径是否存在，若不存在则递归创建 */
function ensurePathAvaliable(filepath: string) {
  try {
    fs.access(filepath)
  } catch (error) {
    fs.mkdir(filepath, { recursive: true })
  }
}

/** 存储数据 */
export async function saveData(data: userInfo) {
  ensurePathAvaliable(filepath)
  const finalpath: string = path.join(filepath, data.userId) + '.json'
  await fs.writeFile(finalpath, JSON.stringify(data, null, 2))
}

/** 读取数据 */
export async function loadData(userId: string): Promise<string> {
  ensurePathAvaliable(filepath)
  const finalpath = path.join(filepath, userId) + '.json'
  try {
    await fs.access(finalpath)
  } catch (error) {
    console.log('NEW USER!')
    let newUser = defaultUser
    newUser.userId = userId
    await saveData(newUser)
  }
  return await fs.readFile(finalpath, 'utf8')
}

export async function signUp() {
  
}