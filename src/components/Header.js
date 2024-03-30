import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () =>
{

    const user = useSelector((store) => store.user);
   
    const navigate = useNavigate();

    const handleSignOut = () =>
    {
        signOut(auth).then(() => 
        {
            navigate('/');
        })
        .catch((error) => 
        {
            console.log(error);
        });
    }

    return(
        <div className="w-full absolute flex justify-between items-center">
            <div className="px-36 py-1 z-10">
                <img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
                alt="logo"
                className="w-46 h-20 saturate-150"
                />
            </div>
            { user && 
            <div className="flex z-10 items-center mr-4">
            <img className="h-8 rounded-sm mr-2" src="https://occ-0-4994-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png?r=229" alt="user-logo"/>
            <label className="mr-2">{user.displayName}</label>
            <button className="bg-black p-1 px-2 rounded-md text-white text text-sm" onClick={handleSignOut}>Sign out</button>
        </div>
            }
        </div>
    )
}

export default Header;