import axios from "axios";

export default class Api {

    request(method, config) {
        return axios({
            timeout: 5000, // 시간이 오래 걸리는 요청에 대한 timeout 값 재정의, 5초
            url: method,
            headers: { "Cache-Control": "no-cache" }, // 자체 캐쉬 처리되어 실제 서버를 호출하지 않는 현상 해결
            ...config // method + params
        })
            .then(result => {
                console.log("API 호출 성공")
                console.log(result.data)
                return result.data
            })
            .catch(error => {
                console.log("API 호출 실패")
                console.log(error)
            });
    }

    exampleApi = () => {
        return this.request("https://reqres.in/api/products", {
            method: "GET",
            params: {}
        })
    }
}
