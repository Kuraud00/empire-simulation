import fs from 'fs/promises'
import path from 'path'

export type corpInfo = {
  start_to_grow: Date,
  corp_type: number,
}

export type userInfo = {
  userId: string,
  coins: number,
  farm_level: number,
  last_sign_up: Date,
  bonus_count: number,
  corp_info: corpInfo,
}

export const corpType = ["Empty","Wheat","Carrot","Potato","MEGA watermelon"]

const filepath = path.join(path.resolve(__dirname, '..'), 'data')

const defaultCorp: corpInfo = {
  start_to_grow: new Date(Date.now()),
  corp_type: 0,
}

const defaultUser: userInfo = {
  userId: null,
  coins: 0,
  farm_level: 1,
  last_sign_up: null,
  bonus_count: 0,
  corp_info: defaultCorp,
}

/** 路径是否存在，若不存在则递归创建 */
async function ensurePathAvaliable(filepath: string) {
  try {
    await fs.access(filepath)
  } catch (error) {
    await fs.mkdir(filepath, { recursive: true })
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