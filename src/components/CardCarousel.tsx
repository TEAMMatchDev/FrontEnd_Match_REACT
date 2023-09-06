import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'; // Import the useRecoilValue hook
import { accessTokenState } from "../state/loginState";
import {cardIdState} from "../state/cardState";
import {IMAGES} from "../constants/images";
import './styles.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";
import {windowState} from "../state/windowState";
const baseUrl = 'https://www.match-api-server.com';

const CardCarousel = () => {

    const [items, setItems] = useState<any[]>([]);
    const [cardId, setCardId] = useRecoilState(cardIdState);
    const token = useRecoilValue(accessTokenState);

    window.addEventListener('focus', function() {
        console.log('사용자가 웹페이지에 돌아왔습니다.')
        try {
            const config = {
                headers: {
                    //todo token으로 바꾸기
                    "X-AUTH-TOKEN": token,
                    "Header": token,
                    "Access-Control-Allow-Headers": token,
                    "Access-Control-Allow-Origin": `https://match-dev-official.vercel.app`,
                    "Access-Control-Allow-Credentials": true,
                }
            };
            axios.get(baseUrl + `/order/pay/card`, config)
                .then((response) => {
                    //setPData(response.data.result);
                    setItems(response.data.result);
                    console.log('# CardCarousel -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch((error) => {
                    console.error('# CardCarousel Error fetching data:', error);
                });
        } catch (e) {
            console.error(e);
        }
    }, false);

    useEffect(() => {
        console.log('# CardCarousel tokennnnn: '+token);
        try {
            const config = {
                headers: {
                    //todo token으로 바꾸기
                    "X-AUTH-TOKEN": token,
                    "Header": token,
                    "Access-Control-Allow-Headers": token,
                    "Access-Control-Allow-Origin": `https://match-dev-official.vercel.app`,
                    "Access-Control-Allow-Credentials": true,
                }
            };
            axios.get(baseUrl + `/order/pay/card`, config)
                .then((response) => {
                    //setPData(response.data.result);
                    setItems(response.data.result);
                    console.log('# CardCarousel -- axios get detail 요청 성공');
                    // console.log('pdataaaaa : '+pdata.contents);
                    // console.log('pdata:', JSON.stringify(pdata, null, 2));
                })
                .catch((error) => {
                    console.error('# CardCarousel Error fetching data:', error);
                });


        } catch (e) {
            console.error(e);
        }

    },[])



    const handleSubmitCard = () => {
        //todo 새창 열기 PayBankScreen : auth/register
        const reactapphomeurl = process.env.REACT_APP_PUBLIC_URL+``;
        const url = `${reactapphomeurl}/auth/banks`;
        const newWindow = window.open(url, '_blank');
        if (newWindow) {
            newWindow.focus();
        }
    };

    // 옵션
    const [currentSlide, setCurrentSlide] = useState(0);
    const settings = {
        dots: true,
        infinite: false, //캐러셀의 끝에 도달하면 항목이 처음으로 돌아가지 않게
        speed: 500,
        slidesToShow: 1, //한 화면에 보이는 아이템 개수
        slidesToScroll: 1, //한번에 넘어가는 컨텐츠 수
        afterChange: (index: number) => { //사용자가 슬라이드 할 때마다
            setCurrentSlide(index);
            const currentItem = items[index];
            if(currentItem) {
                console.log(`Current Index: ${index}, Item ID: ${currentItem.id}`);
                setCardId(`${currentItem.id}`); //현재 카드의 id를 recoil로 상태 저장
            }
        }
    }

    return (
        <>
            <div className="carousel">
                <div>
                    <Slider {...settings}>
                        {items.map((item) => (
                            <ListItem
                                key={item.id}
                                customKey={item.id}
                                cardCode={item.cardCode}
                                cardName={item.cardName}
                                cardNo={item.cardNo}
                            />
                        ))}
                        <img src={IMAGES.submitCardBtn} className={"centered-img"}
                             onClick={handleSubmitCard}/>
                    </Slider>
                </div>
            </div>
        </>
    );
}
interface ListItemProps {
    customKey: number;
    cardCode: string;
    cardName: string;
    cardNo: string;
}
const ListItem: React.FC<ListItemProps> = ({ cardName, cardNo }) => {

    return (
        <div className="card-container">
            <text className="item-name">{cardName}</text>
            <text className="item-num">{cardNo}</text>
        </div>
    );
}
export default CardCarousel;
