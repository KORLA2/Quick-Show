export let TimeFormat=(minutes:number)=>{

    let hours=Math.floor(minutes/60);
    let mins=minutes%60;
   return `${hours} h ${mins} m`
}