import React from 'react';
import {Carousel} from 'react-ui-component';
import css from './css/demo.less';

const src = ['ambition-morty','ambition-morty', 'awkward-morty', 'despise', 'pride-morty'];
const prefix = 'https://raw.githubusercontent.com/jerryshew/design/master/png';
const getImgs = function(){
    let rtn = [];
    for (let i of src){
        rtn.push(<img key={i} src={`${prefix}/${i}.png`} style={{'width': '100%'}}/>);
    }
    return rtn;
};

//imgNodes是数组 
const imgNodes = getImgs();

export default class TSWCarousel extends React.Component {
    render() {
        let items = [];

        let prev = <h4>&lt;&lt;</h4>;
        let next = <h4>&gt;&gt;</h4>;
        return (
            <div>
                <ul className="two carousel-demo">

                    <li>
                        <h4>Auto play carousel</h4>
                        <Carousel autoPlay={true} delay={5000}>
                            {imgNodes}
                        </Carousel>
                    </li>

                </ul>
            </div>
        );
    }
}
