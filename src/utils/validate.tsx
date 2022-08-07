import { message } from "antd";
import { checkEmail } from "../api/auth";

const checkIsEmail = async (email: any) => {
    const {data} = await checkEmail(email);
    console.log(data.length) 
    if(data.length == 0) {
      return true
    }else{
      return false
    }
  }
export const ValidateEmail = async (inputText: any) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(await checkIsEmail(inputText)) {
        if (inputText.match(vnf_regex) || inputText.match(mailformat)) {
            return true;
        }
        else {
            message.error("Bạn đã nhập một địa chỉ email hợp lệ!");
            return false;
        }
    }else{
        message.error('Số điện thoại hoặc email đã tồn tại ')
    }
    
}