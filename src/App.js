import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import { Provider } from 'react-redux';
import { Store } from './utils/Store';
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import VideoContainer from './Components/VideoContainer';
import WatchPage from './Components/WatchPage';
import Search from './Components/Search';
import Channel from './Components/Channel';
import LikedVideos from './Components/LikedVideos';
import History from './Components/History';
import Error from './Components/Error';
import Subscriptions from './Components/Subscriptions';

const approuter = createBrowserRouter([
  {
    path:"/",
    element:<Header />,
    children:[{
      path:"/",
      element:<Body />,
      errorElement:<Error/>,
      children:[
        {
          path:"/",
          element:<VideoContainer />
        },
        {
          path:"/watch",
          element:<WatchPage />
        },
        {
          path:"/search/:id",
          element:<Search />
        },
        {
          path:"/channel/:id",
          element:<Channel />
        },
        {
          path:"/liked-videos",
          element:<LikedVideos />
        },
        {
          path:"/history",
          element:<History />
        },
        {
          path:"/subscriptions",
          element:<Subscriptions />
        }
      ]
    }
    ]
  },

])
function App() {
  return (
    <div>
    <Provider store={Store}>
      <RouterProvider router={approuter} />
    </Provider>
    </div>
  );
}

export default App;
