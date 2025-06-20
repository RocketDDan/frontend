import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './CommentPanel.module.css';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { TextInput } from '../base/Input';
import { Button } from '../base/Button';
import { useCallback, useEffect, useState } from 'react';
import { deleteFeedComment, fetchFeedCommentList, postFeedComment } from '../../api/feedComment.api';
import sampleFeed from '../../dto/feed.dto';
import Swal from 'sweetalert2';
import Comment from './Comment';
import useCheckLogin from '../../util/RequiredLogin';


/**
 * @component
 * @param {sampleFeed} feed 
 * @returns 
 */
const CommentPanel = ({ feed, onClose, writeComment, deleteComment }) => {

    const [inputValue, setInputValue] = useState("");
    const [commentList, setCommentList] = useState([]);
    const checkLoginUser = useCheckLogin();

    // 댓글 작성 값 변경
    const handleInputChange = (val) => {
        setInputValue(val);
    }
    // 댓글 작성창 비우기
    const handleInputClear = () => {
        setInputValue("");
    }

    // 댓글 작성
    const handleSubmit = async () => {
        // console.log("handleSubmit() :: 살행");
        const isLogin = await checkLoginUser();
        if (!isLogin) return;
        // 댓글 작성 api 호출
        await postFeedComment(feed.feedId, inputValue);
        writeComment?.(feed.feedId);
        handleInputClear();
        // react event queue 안정성 위해 defer 처리
        setTimeout(() => {
            fetchData();
        }, 0);
    }

    // 댓글 목록 가져오기
    const fetchData = useCallback(async () => {
        const data = await fetchFeedCommentList(feed.feedId);
        setCommentList(data);
    }, [feed]);

    // 댓글 삭제
    const handleCommentDelete = async (commentId) => {
        const result = await Swal.fire({
            title: '정말 삭제하시겠습니까?',
            text: "삭제하면 복구할 수 없습니다.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            await deleteFeedComment(feed.feedId, commentId);
            deleteComment?.(feed.feedId);
            fetchData();

            await Swal.fire({
                title: '삭제 완료!',
                text: '댓글이 삭제되었습니다.',
                icon: 'success',
                timer: 700,
                showConfirmButton: false
            });
        }
    }

    useEffect(() => {
        if (!feed) return;
        fetchData();
    }, [feed])

    if (!feed) return null;

    return feed ? (
        <div className={`${style.container} ${!feed ? style.hide : ''}`}>
            {/* 헤더 */}
            <label>
                <div className={style.up}>
                    <div>&nbsp;</div>
                    <span>댓글</span>
                    <span className={style.closeBtn}>
                        <FontAwesomeIcon icon={faClose} onClick={onClose} />
                    </span>
                </div>
            </label>

            {/* 댓글 목록 */}
            <div className={style.commentList}>
                {commentList.length
                ? commentList.map(comment => (
                    <Comment comment={comment} clickDelete={handleCommentDelete} key={comment.commentId} />
                ))
                : <span>댓글이 없습니다.</span>
            }
            </div>

            {/* 댓글 작성 */}
            <div className={style.writeRow}>
                <TextInput
                    closeBtnVisible={true}
                    value={inputValue}
                    placeholder={"댓글 입력"}
                    onChange={handleInputChange}
                    onEnter={handleSubmit}
                    autoFocus={false}
                />
                <Button
                    width='30%'
                    content='입력'
                    onClick={handleSubmit} 
                    />
            </div>
        </div>
    ) : null;
}

export default CommentPanel;