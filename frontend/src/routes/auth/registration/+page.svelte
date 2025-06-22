<script>
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    const user = {
        name: '',
        email: '',
        password: '',
    };


    async function onSubmit(event) {
        event.preventDefault();

        console.log(user);

        const res = await fetch('http://localhost:3000/auth/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(user)
        });
        goto("/products");
    }


    // function isPasswordMatch() {
    //     let password = document.getElementById("password");
    //     let confirmPassword = document.getElementById("confirmPassword");
    //     let divCheckPassword = document.getElementById("divCheckPassword");
    //
    //     divCheckPassword.hidden = false;
    //
    //     if (password !== confirmPassword) {
    //         divCheckPassword.hidden = true;
    //     } else {
    //         password = confirmPassword;
    //     }
    // }
</script>

<!--
This example requires updating your template:

```
<html class="h-full bg-white">
<body class="h-full">
```
-->

<section class="flex items-center justify-center h-[100vh] bg-pink-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center text-2xl font-semibold text-gray-900">
            <img class="mx-auto max-w-screen-xl text-center" style="width: 15%" src="/logo.png" alt="logo">
        </a>
        <div class="w-full h-160 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                    Регистрация
                </h1>
                <form id="registrationForm" class="space-y-4 md:space-y-6" action="#" onsubmit="{onSubmit}"
                      method="POST">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                            Логин
                        </label>
                        <input name="name" id="name"
                               class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                               placeholder="Имя пользователя" required="" bind:value={user.name}>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                            E-mail
                        </label>
                        <input type="email" name="email" id="email"
                               class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-black focus:ring-black block w-full p-2.5"
                               placeholder="Адрес эл. почты" required="" bind:value={user.email}>
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900">
                            Пароль
                        </label>
                        <input type="password" name="password" id="password" placeholder="Придумайте пароль"
                               class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-black focus:ring-black block w-full p-2.5"
                               required="" bind:value={user.password}>
                    </div>

                    <div>
                        <label for="confirm-password"
                               class="block mb-2 text-sm font-medium text-gray-900">Повторите пароль</label>
                        <input type="password" name="confirm-password" id="confirm-password"
                               placeholder="••••••••"
                               class="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:border-black focus:ring-black block w-full p-2.5"
                               required="" value=""/>
                    </div>

                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox"
                                   class="w-4 h-4 checked:text-pink-700 border border-gray-500 rounded bg-gray-50 focus:ring-0"
                                   required="">
                        </div>
                        <div class="ml-3 text-sm">
                            <label for="terms" class="font-light text-gray-700">I accept the <a
                                    class="font-medium text-primary-600 hover:underline" href="#">Terms
                                and Conditions</a></label>
                        </div>
                    </div>
                    <button type="submit"
                            class="w-full text-black border border-gray-400 bg-[#F7FFBC] hover:cursor-grab hover:bg-pink-700 hover:text-white focus:border-1 focus:border-pink-700 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Зарегистрироваться
                    </button>
                    <p class="text-sm font-light text-gray-700">
                        Уже есть аккаунт? <a href="/auth/login"
                                             class="font-medium text-primary-600 hover:underline dark:text-primary-500">Нажмите
                        здесь</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>