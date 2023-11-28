import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


axios.defaults.baseURL = "http://localhost:3000";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const navigate = useNavigate();
    // kullanıcı projeye girdiğinde hesap bilgilerini al (yenilemeyi engelleme)
    useEffect(() => {
        const user_id = localStorage.getItem("token");
        // kayıtlı kullancıı varsa
        if (user_id){
            axios.get(`/users/${user_id}`)
            .then((res) => setActiveUser(res.data))
            .catch(() => toast.error("Kullanıcı bilgileri alınamadı"))
        } else {
            // kullanıcı kayıtlı değilse 
        }
    }, []);
    // oturumu açık olan kullanıcının bilgilerini tutma
    const [activeUser, setActiveUser] = useState();

    // hesap oluşturma, kullanıcıyı kaydetme
    const signUp = (user) => {
        axios.post("/users", user)
        // başarılı olursa idsini localStorage kaydetme
        .then(() => {
            localStorage.setItem("token", user.id);
            // aktif kullanıcı güncelleme
            setActiveUser(user);
            // ana sayfaya yönlendir
            navigate("/");
            // bildirim ver
            toast.success("hesabınız oluşturuldu");
        })
        // başarısız olursa
        .catch(() => {
            toast.error("Hesap oluştururken bir hata oluştu");
        })
    };

    // hesaba giriş yapma
    const login = (user) => {
        // giriş yapılan hesabın bilgilerini alma
        axios.get(`/users?name=${user.name}&password=${user.password}&_limit=1`)
        .then((res) => {
            // kayıtlı kullanıcı değilse
            if(res.data.length === 0) {
                toast.error("Kullanıcı Bulunamadı")
            } else { 
                // kayıtlı kullanıcıysa
                // state gönder
                setActiveUser(res.data[0]);
                // local storage kaydetme
                localStorage.setItem("token", res.data[0].id)
                // anasayfada yönlendir
                navigate("/")
                toast.success("Hesaba giriş yapıldı")
            }
        })
        .catch((err) => console.log(err) )
    };

    // hesaptan çıkış yapma
    const logout = () => {
        // localden hesabı silme
        localStorage.removeItem("token");
        // aktif kullanıcıyı sıfırla
        setActiveUser(null);
        // login sayfasına yönlendirme
        navigate("/login");
        toast.success("Çıkış yapıldı")
    };

    // hesabı sil
    const deleteAccount = () => {
        // kullanıcının idsine erişmek için istek
        axios.delete(`/users/${activeUser.id}`)
        .then(() => {logout(); toast.info("Hesabınız Silindi")})
        .catch(() => toast.error("Hesap Silinemedi"))
    };

    return (
        <UserContext.Provider value={{activeUser,signUp,login,logout,deleteAccount}}>{children}</UserContext.Provider>
    );
};