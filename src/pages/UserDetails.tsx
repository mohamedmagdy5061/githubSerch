import React, { useEffect, useState } from 'react';
import HTTP from '../services/axiosInstance';
import { GiShadowFollower, GiNestedHearts } from 'react-icons/gi';
import { BiGitRepoForked } from 'react-icons/bi';
import { BsBuilding, BsLink } from 'react-icons/bs';
import { GoLocation } from 'react-icons/go';
import { HiOutlineMail } from 'react-icons/hi';
import LazyImage from '../components/ImageLazyLoad';
import { IUser } from '../interfaces';

const UserDetails: React.FC = ({ match }: any) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const { id } = match.params;

  const getUserInfo = async () => {
    await HTTP.get(`/users/${id}`)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="profile">
      <div className="profile_wrapper">
        <div className="profile_pic">
          <LazyImage src={userInfo?.avatar_url} />
        </div>

        <div className="profile_name">
          <p className="name">{userInfo?.name}</p>
          <span className="sub_name">{userInfo?.login}</span>
        </div>

        <div className="profile-bio">
          <p>{userInfo?.bio}</p>
        </div>

        <div className="profile-Info">
          <ul>
            <li>
              <span className="icon">
                <BsBuilding color={'darkgray'} size={16} />
              </span>
              <span className="title">{userInfo?.company}</span>
            </li>
            <li>
              <span className="icon">
                <GoLocation color={'darkgray'} size={16} />
              </span>
              <span className="title">{userInfo?.location}</span>
            </li>
            <li>
              <span className="icon">
                <HiOutlineMail color={'darkgray'} size={16} />
              </span>
              <span className="title">{userInfo?.email}</span>
            </li>
            <li>
              <span className="icon">
                <BsLink color={'darkgray'} size={18} />
              </span>
              <a
                className="title"
                rel="noreferrer"
                target="_blank"
                href={userInfo?.html_url}
              >
                {userInfo?.html_url}
              </a>
            </li>
          </ul>
        </div>

        <div className="profile_counts">
          <div className="profile_counts_wrap">
            <div className="item">
              <div className="icon">
                <GiShadowFollower color={'darkgray'} size={18} />
              </div>
              <div className="title">
                <span className="title__number">{userInfo?.followers}</span>
                Followers
              </div>
            </div>
          </div>
          <div className="profile_counts_wrap">
            <div className="item">
              <div className="icon">
                <GiNestedHearts color={'darkgray'} size={18} />
              </div>
              <div className="title">
                <span className="title__number">{userInfo?.following}</span>
                Following
              </div>
            </div>
          </div>
          <div className="profile_counts_wrap">
            <div className="item">
              <div className="icon">
                <BiGitRepoForked color={'darkgray'} size={18} />
              </div>
              <div className="title">
                <span className="title__number">{userInfo?.public_repos}</span>
                Repos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
