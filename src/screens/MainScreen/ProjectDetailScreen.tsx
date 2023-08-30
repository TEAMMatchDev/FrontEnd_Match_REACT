import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import {useRecoilState, useRecoilValue} from 'recoil'; // Import the useRecoilValue hook

import { accessTokenState } from "../../state/loginState1";
import { tokenState } from '../../state/loginState2';

import axios from "axios";
import { TEXT } from "../../constants/text";
import './styles.css';

const baseUrl = 'https://www.match-api-server.com';

const ProjectDetailScreen: React.FC = () => {
    const REACT_APP_PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

    const regularPayUrl = REACT_APP_PUBLIC_URL+`/auth/pay/regular`
    const oneTimeUrl = REACT_APP_PUBLIC_URL+`/auth/pay/onetime`

    const token = useRecoilValue(accessTokenState);
    // const [token, setToken] = useRecoilState(tokenState);
    // const log = useRecoilValue(tokenState)

    const params = useParams().projectId;
    const projectId = params;

    const [pdata, setPData] = useState<any>([]);
    const [items, setItems] = useState<any[]>([]);
    const [payMethod, setPayMethod] = useState(""); //정기or단기 결제
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        console.log('jwt : ' + token);

        //console.log('pid: ' + projectId);
        try {
            const data = {
                projectId : projectId,
            };

            const config = {
                headers: {
                    "X-AUTH-TOKEN": token,
                }
            };

            axios.get(baseUrl + `/projects/${projectId}`, config)
                .then((response) => {
                    setPData(response.data.result);
                    setItems(response.data.result.projectImgList);
                    setPayMethod(response.data.result.regularStatus);
                    console.log('# ProjectDetailScreen -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));

                    axios.post(baseUrl+`/order/${projectId}`,{projectId: projectId}, config) //api 연결
                        .then((res) => {
                            setOrderId(res.data.result);
                            console.log('# ProjectDetailScreen -- axios post 요청 성공');
                            console.log('order id : ' + orderId);
                        })
                        .catch(function (error){
                            console.log("04-00 post 실패");
                        });
                });

        } catch (e) {
            console.error(e);
        }
    }, [projectId, token]);


    const handleNextBtn = () => {
        sendToServer(token);

        if (payMethod === "REGULAR") {
            window.location.href = regularPayUrl;
        } else {
            window.location.href = oneTimeUrl;
        }
    }

    const sendToServer = async (token:string ) => {
        const data = {
            projectId: projectId,
        };

        axios.post(
            baseUrl+`/order/pay`,
            data,
            {
                headers: {
                    "X-AUTH-TOKEN": token,
                },
            }
        )
    }



    return (
        <div>
            <div className="title">{TEXT.detailHeader}</div>
            <div className="detail-item-usage">
                {pdata.usages ? `${pdata.usages}` : 'Loading...'}
            </div>

            <div className={"list-container"}>
                <ul>
                    {items.map((item) => (
                        <ListItem
                            imgId={item.imgId}
                            imgUrl={item.imgUrl}
                            sequence={item.sequence}
                        />
                    ))}
                </ul>
            </div>

            <div className={"next-btn-div"}>
                <button className={"next-btn"}
                        onClick={() => handleNextBtn()}
                >성냥기부 동참하기</button>
            </div>
            <div className="detail-item-footer">{TEXT.detailFooter}</div>
        </div>
    );
};

interface ImageObject {
    imgId: number;
    imgUrl: string;
    sequence: number;
}
const ListItem: React.FC<ImageObject> = ({ imgId, imgUrl, sequence }) => {
    return (
        <div className="list-item">
            <img className={"detail-item-img"} src={imgUrl} alt="이미지"/>
        </div>
    );
}
export default ProjectDetailScreen;
