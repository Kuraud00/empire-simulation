import { userInfo, corpInfo, corpType } from "./data-storage"
import { } from 'koishi-plugin-puppeteer'
import { corp } from "./corps";

export const html = {
    getFarmPicture(userInfo: userInfo,growTime: number) {
        const corp_info: corpInfo = userInfo.corp_info;
        const start_to_grow:Date = new Date(corp_info.start_to_grow);
        const corp_type: string = corpType[corp_info.corp_type];

        const temp = Date.now();
        const current_time = new Date(temp);
        const rest_time = current_time.getTime() - start_to_grow.getTime();

        const rest_day = Math.floor(rest_time / (1000 * 60 * 60 * 24));
        const rest_hour = Math.floor((rest_time - (rest_day * 1000 * 60 * 60 * 24)) / 1000 * 60 * 60);
        const rest_min = Math.floor((rest_time - (rest_day * 1000 * 60 * 60 * 24) - (rest_hour * 1000 * 60 * 60)) / 1000 * 60);   

        const growth_percent = rest_time / (growTime * 60 * 60 * 1000);
        var level;
        if (growth_percent >= 1) {
            level = 5;
        } else if (0.8 <= growth_percent && growth_percent < 1) {
            level = 4;
        } else if (0.6 <= growth_percent && growth_percent < 0.8) {
            level = 3;
        } else if (0.4 <= growth_percent && growth_percent < 0.6) {
            level = 2;
        } else {
            level = 1;
        }
            
        return `
        <body style="width: 300px;height: 300px;">
    <style>
        body{
            background-image: url(${corp.get_background_url()});
            background-repeat: no-repeat;
        }
        table{
            margin-left: 55px;
            border-collapse: collapse;
        }
        td{
            border: 1px solid #57380a8;
            width: 53px;
            height: 43px;
            text-align: center;
        }
        div{
            height:12px;
            width:100%;
        }
    </style>

    <div></div>

    <table>
        <tr>
            <td><img src="${corp.get_wheat(level)}"></td>
            <td><img src="${corp.get_wheat(level)}"></td>
            <td><img src="${corp.get_wheat(level)}"></td>
        </tr>
        <tr>
            <td><img src="${corp.get_wheat(level)}"></td>
            <td><img src="${corp.get_wheat(level)}"></td>
            <td><img src="${corp.get_wheat(level)}"></td>
        </tr>
        <tr>
            <td><img src="${corp.get_wheat(level)}"></td>
            <td><img src="${corp.get_wheat(level)}"></td>
            <td><img src="${corp.get_wheat(level)}"></td>
        </tr>
    </table>
</body>
        `
    }
}