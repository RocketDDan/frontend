import feedCardStyle from './FeedCard.module.css'

import FeedSampleImage from '../../assets/sample_images/feed_sample.webp'
import { FeedProfileImage } from '../profile/ProfileImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons'

const FeedCard = (props) => {
    return (
        <div className={feedCardStyle.container}>
            <div className={feedCardStyle.writer_row}>
                <FeedProfileImage profileUrl={props.writerProfileUrl} />
                <span>{props.writerNickname}</span>
                <div>⋯</div>
            </div>
            {/* TODO: feedFileUrlList 순회하면서 fileUrl 가져오기 */}
            <img src={props.feedImage || FeedSampleImage} alt="피드 이미지" width={'100%'} />
            <div className={feedCardStyle.under_content_row}>
                <div>
                    {
                        props.heartName?.like === true
                            ? <FontAwesomeIcon icon={faSolidHeart} />
                            : <FontAwesomeIcon icon={faRegularHeart} />
                    }
                    <FontAwesomeIcon icon={faMessage} />
                </div>
                <div></div>
                <div></div>
            </div>
            <div className={feedCardStyle.comment}>
                안녕~오운완
            </div>
            <div>
                댓글 {props.commentCount}개 모두 보기
            </div>
        </div>
    );
}

export default FeedCard;