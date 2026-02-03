export let TimeFormat=(minutes:number)=>{

    let hours=Math.floor(minutes/60);
    let mins=minutes%60;
   return `${hours} h ${mins} m`
}
export let TimeFormatSec=(seconds:number)=>{

    let min=Math.floor(seconds/60);
    let sec=seconds%60
    return `${min} m ${sec} s`
}