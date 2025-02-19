import { Context,h } from "koishi";
import { } from 'koishi-plugin-puppeteer'
import { loadData, saveData, userInfo } from './data-storage'
import { html } from "./farmpic";

export function farm(ctx: Context, config: any) {

    const growTime:number = config.farmTimeToGrow

    //种田主命令
    ctx.command('种田')
        .action(async ({ session }) => {
            const userId = session.userId
            const userInfo = JSON.parse(await loadData(userId))
            const img = ctx.puppeteer.render(html.getFarmPicture(userInfo,growTime))
            return img
        })

    //子命令
    ctx.command('种田').subcommand('.查询')
        .action(async ({ session }) => {
            const temp: userInfo = JSON.parse(await loadData(session.userId))
            //TO DO：查询作物信息，遍历本地数据并更新
        })

    ctx.command('种田').subcommand('.查看农场')
        .action(async ({ session }) => {
            const temp: userInfo = JSON.parse(await loadData(session.userId))

        })
}