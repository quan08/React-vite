export const formatCash = (str: any) => {
    if(str != undefined){
        let format = str.toString()
        return format.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}