import React from 'react'; 

class App extends React.Component {
  state= {
    isLoading : true,
    movies: []
    };
  componentDidMount(){
    setTimeout ( ()=> {
      this.setState({isLoading : false});
    }, 6000);
  }
  render() {
    const {isLoading} = this.state;
    return (
      <div>
        {isLoading ? "Lodaing..." : "we are ready"}
      </div>
      );
  }
}

export default App;

// 클래스 형은 Class 선언, render()함수 선언, Component 상속을 해야하고,
// 상태관리를 위해 constructor, 생성자 메소드 전언 등…이 필요합니다

// 컴포넌트 실행 순서 : constructor <- render <- comopnentDiMount

//update : state가 변경되다.