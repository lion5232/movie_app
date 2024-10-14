import React from 'react'; 

class App extends React.Component {
  state= {
    count:0
  };

  add= () => {
    this.setState(current =>({count: current.count +1}));
  };
  minus= () => {
    this.setState(current=>({count:current.count -1}));
  };
  render() {
    return (
      <div>
        <h1>The number is: {this.state.count}</h1>
        <button onClick={this.add}>add</button>
        {/* this.add()는 즉시 발동, this.add는 클릭했을때만 발동 */}
        <button onClick={this.minus}>minus</button>
      </div>
      );
  }
}

export default App;

// 클래스 형은 Class 선언, render()함수 선언, Component 상속을 해야하고,
// 상태관리를 위해 constructor, 생성자 메소드 전언 등…이 필요합니다

// 컴포넌트 실행 순서 : constructor <- render <- comopnentDiMount

//update : state가 변경되다.