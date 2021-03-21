import React, { useEffect, useState } from 'react';
import HTTP from '../services/axiosInstance';
import { RiStarSFill } from 'react-icons/ri';
import { FaUsers } from 'react-icons/fa';
import { BsBuilding, BsLink, BsFillEyeFill } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import LazyImage from '../components/ImageLazyLoad';
import { IRepo } from '../interfaces';
import { RepoModel } from '../models';

const RepoDetails: React.FC = ({ match }: any) => {
  const [repoInfo, setRepoInfo] = useState<IRepo | null>(null);
  const { name, id } = match.params;

  const getRepoInfo = async () => {
    const url = `/repos/${name}/${id}`
    await HTTP.get(url)
      .then(({ data }) => {
        let newData = new RepoModel(data)
        setRepoInfo(newData);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRepoInfo();
  }, [id]);

  return (
    <div className="profile">
      <div className="profile_wrapper">
        <div className="profile_pic">
          <LazyImage src={repoInfo?.avatar_url} />
        </div>

        <div className="profile_name">
          <p className="name">{repoInfo?.name}</p>
          <span className="sub_name">{repoInfo?.login}</span>
        </div>

        <div className="profile-bio">
          <p>{repoInfo?.description}</p>
        </div>

        <div className="profile-Info">
          <ul>
            <li>
              <span className="icon">
                <BsBuilding color={'darkgray'} size={16} />
              </span>
              <span className="title">{repoInfo?.company}</span>
            </li>
            <li>
              <span className="icon">
                <MdLanguage color={'darkgray'} size={16} />
              </span>
              <span className="title">{repoInfo?.language}</span>
            </li>
            <li>
              <span className="icon">
                <HiOutlineMail color={'darkgray'} size={16} />
              </span>
              <span className="title">{repoInfo?.email}</span>
            </li>
            <li>
              <span className="icon">
                <BsLink color={'darkgray'} size={18} />
              </span>
              <a
                className="title"
                rel="noreferrer"
                target="_blank"
                href={repoInfo?.html_url}
              >
                {repoInfo?.html_url}
              </a>
            </li>
          </ul>
        </div>

        <div className="profile_counts">
          <div className="profile_counts_wrap">
            <div className="item">
              <div className="icon">
                <BsFillEyeFill color={'darkgray'} size={18} />
              </div>
              <div className="title">
                <span className="title__number">{repoInfo?.watchers}</span>
                Watchers
              </div>
            </div>
          </div>
          <div className="profile_counts_wrap">
            <div className="item">
              <div className="icon">
                <RiStarSFill color={'darkgray'} size={18} />
              </div>
              <div className="title">
                <span className="title__number">{repoInfo?.stargazers_count}</span>
                Stars
              </div>
            </div>
          </div>
          <div className="profile_counts_wrap">
            <div className="item">
              <div className="icon">
                <FaUsers color={'darkgray'} size={18} />
              </div>
              <div className="title">
                <span className="title__number">{repoInfo?.subscribers_count}</span>
                Subscribers
              </div>
            </div>
          </div>
        </div> 
      </div> 
    </div>
  );
};

export default RepoDetails;
