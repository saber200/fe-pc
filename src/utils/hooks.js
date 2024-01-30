import { useLocation } from 'react-router-dom';

export function useQuery() {
  const location = useLocation(); // 从 react-router-dom 库中引入 useLocation 钩子

  return new URLSearchParams(location.search);
}