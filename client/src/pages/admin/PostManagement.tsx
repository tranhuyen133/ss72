import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getPost } from '../../stores/reducers/postReducer';
import { Link } from 'react-router-dom';

export default function PostManagement() {
    const posts = useSelector((state:any) => state.posts.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost());
    }, [dispatch]);

    const deleteNewPost = (id:number) => {
        dispatch(deletePost(id));
    }

    return (
        <div>
            <div style={{display:"flex",gap:"20px"}}>
                <Link to="/admin">Danh sách bài viết</Link>
                <Link to="/add">Thêm mới bài viết</Link>
            </div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Thumbnail</th>
                        <th>Category</th>
                        <th>Updated At</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.map((item:any, index:any) => (
                        <tr key={item.id}>
                            <td style={{padding:"20px"}}>{index + 1}</td>
                            <td style={{padding:"20px"}}>{item.title}</td>
                            <td style={{padding:"20px"}}><img src={item.thumbnail} alt="" width="150px"/></td>
                            <td style={{padding:"20px"}}>{item.category}</td>
                            <td style={{padding:"20px"}}>{item.updateAt}</td>
                            <td style={{ padding: "20px" }}>{item.status ? "Đã xuất bản" : "Chưa xuất bản"}</td>
                            <td style={{ padding: "20px" }}>
                                <button><i className="fa-solid fa-lock"></i></button>
                                <button onClick={() => deleteNewPost(item.id)}><i className="fa-solid fa-trash"></i></button>
                                <button><i className="fa-solid fa-pen"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
