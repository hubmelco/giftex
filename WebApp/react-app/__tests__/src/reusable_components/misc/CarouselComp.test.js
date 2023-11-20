import {shallow} from "enzyme";
import React from "react";
import CarouselComp from "../../../../src/reusable_components/misc/CarouselComp";

describe('Test Carousel Component', () => {

    const props = {
        id: 'gift',
        map: {
            0: {
                key: "9",
                props: {
                    gift: {
                        category: null,
                        createdAt: "2022-04-21T12:03:25.000Z",
                        deadline: "2030-05-16",
                        description: "ayo0",
                        eventId: 1,
                        id: 9,
                        name: "20 lb gummy worm",
                        price: 30,
                        progress: 0,
                        receiverId: 4,
                        receiverName: "chloe4",
                        thumbnail: "https://images.vat19.com/covers/large/worlds-largest-gummy-worm.jpg",
                        updatedAt: "2022-05-16T21:07:58.000Z",
                        userId: 1
                    }
                }
            },
            1: {
                key: "10",
                props: {
                    gift: {
                        category: null,
                        createdAt: "2022-04-21T12:03:25.000Z",
                        deadline: "2030-11-06",
                        description: "is this even possible??",
                        eventId: 1,
                        id: 10,
                        name: "The pyramids",
                        price: 50000000000,
                        progress: 0,
                        receiverId: 4,
                        receiverName: "chloe4",
                        thumbnail: "https://www.history.com/.image/t_share/MTU3ODc5MDg2NDMxODcyNzM1/egyptian-pyramids-hero.jpg",
                        updatedAt: "2022-05-16T21:07:46.000Z",
                        userId: 1
                    }
                }
            }
        }
    }

    it("renders without crashing", () => {
        shallow(<CarouselComp map={props.map} id={props.id}/>);
    });

});