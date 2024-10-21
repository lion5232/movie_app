import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

/**icon */
import DashboardIcon from '@mui/icons-material/Dashboard'; // dashboard icon
import MovieIcon from '@mui/icons-material/Movie'; // movie icon
import LiveTvIcon from '@mui/icons-material/LiveTv'; // tv  icon
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import DiamondRoundedIcon from '@mui/icons-material/DiamondRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';
import FolderSpecialRoundedIcon from '@mui/icons-material/FolderSpecialRounded';

import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Home from '../routes/Movie/Home'; // 경로는 파일 위치에 따라 조정
import MoviePlaying from '../routes/Movie/MoviePlaying'; // 경로는 파일 위치에 따라 조정
import TvTopRated from '../routes/Tv/TvTopRated'; // 경로는 파일 위치에 따라 조정
import TvHome from '../routes/Tv/TvHome'; // 경로는 파일 위치에 따라 조정
import Trending from '../routes/Tv/Trending'; // 경로는 파일 위치에 따라 조정
import GenreMovies from '../routes/Movie/Genres/GenreMovies'; // 경로는 파일 위치에 따라 조정
import GenreTvShow from '../routes/Tv/Genres/GenreTvShow'; // 경로는 파일 위치에 따라 조정



 

const NAVIGATION = [
  {
    kind: 'header',
    title: '영화',
  },
  {
    segment: 'dashboard',
    title: '인기 영화 목록',
    icon: <MovieIcon />,
  },
  {
    segment: 'MoviePlaying',
    title: '현재 상영작',
    icon: <VideoLibraryRoundedIcon />,
  },
  {
    segment: 'reports',
    title: '장르별 영화 목록',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'act',
        title: '액션',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'adv',
        title: '모험 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'ani ',
        title: '애니메이션 ',
        icon: <CatchingPokemonIcon />,
      },
      {
        segment: 'com',
        title: '코미디 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'cri',
        title: '범죄 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'doc ',
        title: '다큐멘터리 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'dra ',
        title: ' 드라마',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'fam ',
        title: '가족 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'fan ',
        title: '판타지 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'his ',
        title: '역사 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'sca ',
        title: '공포 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'mui',
        title: '음악 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'mys ',
        title: '미스터리 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'rom ',
        title: '로맨스 ',
        icon: <FavoriteBorderRoundedIcon />,
      },
      {
        segment: 'sciencefiction',
        title: 'SF ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'tvmovie ',
        title: 'TV 영화 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'thr ',
        title: '스릴러 ',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'war',
        title: ' 전쟁',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'wes',
        title: ' 서부',
        icon: <DescriptionIcon />,
      },
    ],
  },

  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'TV',
  },
  {
    segment: 'reports',
    title: '인기 TV 목록',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'TvHome',
        title: '전체',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Trending',
        title: '트렌드',
        icon: <BarChartIcon />,
      },
      {
        segment: 'top_rated',
        title: '높은 평점',
        icon: <DescriptionIcon />,
      },
      
    ],
  },

   
  {
    segment: 'reports',
    title: '장르별 TV 목록',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'Action&Adventure',
        title: '액션&어드벤처',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Anime',
        title: '애니메이션',
        icon: <CatchingPokemonIcon />,
      },
      {
        segment: 'Comedy',
        title: '코미디',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'crime',
        title: '범죄',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Documentary',
        title: '다큐멘터리',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Drama',
        title: '드라마',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Family',
        title: '가족',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Kids',
        title: 'Kids',
        icon: <ChildCareIcon />,
      },
      {
        segment: 'mystery',
        title: '미스터리',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Sci-Fi&Fantasy',
        title: '판타지&공상과학',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'Talk',
        title: '토크',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'War&Politics',
        title: '전쟁 & 정치',
        icon: <DescriptionIcon />,
      },
    ],
  },
 
];

//테마 설정 - 어둡게 밝게
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark:true},
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

//페이지 컨텐츠 컴포넌트 (데모 페이지를 띄우는 컴포넌트로 DashBoard for /dashboard 를 띄운다.)
//컴포넌트의 인자 => props인데 아래와 같은 표현은 => {pathname}와 같이 객체인데 객체 구조 분해 했다.
function DemoPageContent({ pathname }) {
  const renderContent =() => {
    console.log("Current pathname:", pathname);
    switch (pathname) {
      /**Movie */
      case '/dashboard':
          return <Home />;
      case '/MoviePlaying':
        return <MoviePlaying />; // 주문 컴포넌트를 반환
      
      /** 장르별 영화 목록 */
      case '/reports/act':
        return <GenreMovies genreId={28} />; // Action 
      case '/reports/adv':
        return <GenreMovies genreId={12} />; // Adventure
      case '/reports/ani':
        return <GenreMovies genreId={16} />; // Anime
      case '/reports/com':
        return <GenreMovies genreId={35} />; // Comedy
      case '/reports/cri':
        return <GenreMovies genreId={80} />; // Crime
      case '/reports/doc':
        return <GenreMovies genreId={99} />; // Documentary
      case '/reports/dra':
        return <GenreMovies genreId={18} />; // Drama
      case '/reports/fam':
        return <GenreMovies genreId={10751} />; // Family
      case '/reports/fan':
        return <GenreMovies genreId={14} />; // Fantasy
      case '/reports/his':
        return <GenreMovies genreId={36} />; // History
      case '/reports/sca':
        return <GenreMovies genreId={27} />; // Scary
      case '/reports/mui':
        return <GenreMovies genreId={10402} />; // Music
      case '/reports/mys':
        return <GenreMovies genreId={9648} />; // Mystery 
      case '/reports/rom':
        return <GenreMovies genreId={10749} />; // Romance 
      case '/reports/sciencefiction':
        return <GenreMovies genreId={878} />; // SF 
      case '/reports/tvmovie':
        return <GenreMovies genreId={10770} />; // TV Movie 
      case '/reports/thr':
        return <GenreMovies genreId={53} />; // Thriller 
      case '/reports/war':
        return <GenreMovies genreId={10752} />; // War  
      case '/reports/wes':
        return <GenreMovies genreId={37} />; // Western 


      /**TV */
      /**인기 Tv 목록 */
      case '/reports/TvHome' :
        return <TvHome/>
      case '/reports/Trending' :
        return <Trending/>
      case '/reports/top_rated' :
        return <TvTopRated />
      
      
      /** 장르별 Tv목록 */
      case '/reports/Action&Adventure':
        return <GenreTvShow genreId={10759} />; // Action & Adventure
      case '/reports/Anime':
        return <GenreTvShow genreId={16} />; // Animation
      case '/reports/Comedy':
        return <GenreTvShow genreId={35} />; // Comedy
      case '/reports/crime':
        return <GenreTvShow genreId={80} />; // Crime
      case '/reports/Documentary':
        return <GenreTvShow genreId={99} />; // Documentary
      case '/reports/Drama':
        return <GenreTvShow genreId={18} />; // Drama
      case '/reports/Family':
        return <GenreTvShow genreId={10751} />; // Family
      case '/reports/Kids':
        return <GenreTvShow genreId={10762} />; // Kids
      case '/reports/mystery':
        return <GenreTvShow genreId={9648} />; // Mystery
      case '/reports/Sci-Fi&Fantasy':
        return <GenreTvShow genreId={10765} />; // Sci-Fi & Fantasy
      case '/reports/Talk':
        return <GenreTvShow genreId={10767} />; // Talk
      case '/reports/War&Politics':
        return <GenreTvShow genreId={10768} />; // War & Politics 
      default:
        return <Home/>;
    }
  }
  return (
    <Box // 박스 설정 
      sx={{
        py: 4, //위아래 패딩 
        display: 'flex', // flex box 사용
        flexDirection: 'column', // 세로 방향 정렬
        alignItems: 'center', // 중앙 정렬
        textAlign: 'center', // 텍스트 중앙정렬
      }}
    > 
       <Typography variant="h6"></Typography> {/* 제목 추가 */}
      {/* <Typography>Dashboard content for {pathname}</Typography> 현재 경로 출력  */}
      {renderContent()} {/* 조건에 따라 다른 컴포넌트를 렌더링 */}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,// pathname prop 타입 설정
};

// 대시보드 레이아웃 컴포넌트
function DashboardLayoutBasic(props) {
  const { window } = props;  // window prop 추출

  const [pathname, setPathname] = React.useState('/dashboard'); // 초기 경로 설정

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const handleNavigation = (segment) => {
    const newPath = segment === 'dashboard' ? '/dashboard' : `/${segment}`;
    console.log("Navigating to:", newPath);
    setPathname(newPath); // 새로운 경로 설정
  };

  return (
    // preview-start
    <AppProvider // AppProvider로 앱 감싸기
       navigation={NAVIGATION.map(item => ({
        ...item,
        onClick: item.segment ? () => handleNavigation(item.segment) : undefined,
      }))}// 내비게이션 메뉴 전달
      router={router}
      theme={demoTheme}
      window={demoWindow}// window 전달
    >
     <DashboardLayout  >
        <DemoPageContent pathname={pathname} /> {/* 현재 경로를 컨텐츠에 전달 */} 
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

DashboardLayoutBasic.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBasic;

// 강의 참고: typescript #015