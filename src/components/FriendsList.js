import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function FriendsList(props) {
    const history = useHistory();
    // let {control} = props;
    let tokenControl = localStorage.getItem("token");
    const [friends, setFriends] = useState([]);



    // axios.create({
    //     headers: {
    //         Authorization: tokenControl,
    //     },
    // });

    useEffect(() => {
        if (!tokenControl) {
            history.push("/login")
        } else {
            axios
                .get("http://localhost:9000/api/friends", {
                    headers: {
                        Authorization: tokenControl,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setFriends(res.data);
                })
                .catch((err) => console.log(err));
        }

    }, [])


    return (
        <div>
            {tokenControl ? (
                <div>
                    <h2>Friends List</h2>
                    <div>
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend.id}><span> {friend.name} - {friend.email} </span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) :
                (
                    <div>Login olmadık</div>
                )}

        </div>
    );
}