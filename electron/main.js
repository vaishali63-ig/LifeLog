import { app, BrowserWindow } from "electron";
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow(){
    try{
    const window = new BrowserWindow({
        width:1200,
        height:800,
        minWidth:800,
        minHeight:600
    })

  //  window.webContents.openDevTools();
    const indexPath  = path.join(app.getAppPath(),"build","index.html")
 //   if (app.isPackaged){
        console.log(indexPath)
        window.loadFile(indexPath).catch((err)=>{
            console.log("failed load file",err)
        })
    // } else{
    //     window.loadURL("http://localhost:5173/")
    // }
}catch(err){
    console.log("err: ",err)
}
}

app.whenReady().then(()=>{
    createWindow();
    app.on("activate",()=>{
       if (BrowserWindow.getAllWindows().length==0){
        createWindow();
       }
    })
})

app.on("window-all-closed",()=>{
    if (process.platform!="darwin"){
        app.quit();
    }
})