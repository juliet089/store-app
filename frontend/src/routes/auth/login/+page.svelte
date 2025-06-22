<script>
    import {goto} from "$app/navigation";

    let user = {
        email: '',
        password: '',
    };


    async function onSubmit(event) {
        event.preventDefault();

        console.log(user);

        const res = await fetch('http://localhost:3000/auth/login', {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(user)
        });

        console.log(res);

        const status = (await res.json()).status;

        console.log(status);

        goto("/products");
    }
</script>

<!--
This example requires updating your template:

```
<html class="h-full bg-white">
<body class="h-full">
```
-->

<section class="flex items-center justify-center h-[100vh] bg-pink-50">
    <div class="flex min-h-full flex-col justify-center ">

        <img class="mx-auto max-w-screen-xl text-center" style="width: 20%"
             src="/logo.png"
             alt="logo">

        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                Вход</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST" onsubmit="{onSubmit}">
                <div>
                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Адрес электронной почты</label>
                    <div class="mt-2">
                        <input type="email" name="email" id="email" autocomplete="email" required=""
                               bind:value={user.email}
                               class="block w-full rounded-md bg-gray-50 border border-gray-400 px-3 py-1.5 text-base text-black placeholder:text-gray-400 focus:outline-2 sm:text-sm/6">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm/6 font-medium text-gray-900">Пароль</label>
                    </div>
                    <div class="mt-2">
                        <input type="password" name="password" id="password" autocomplete="current-password" required=""
                               bind:value={user.password}
                               class="block w-full rounded-md bg-gray-50 border border-gray-400 px-3 py-1.5 text-base text-black placeholder:text-gray-400 sm:text-sm/6">
                    </div>
                </div>

                <div>
                    <button type="submit"
                            class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold bg-[#F7FFBC] border border-gray-400 text-black hover:cursor-grab hover:bg-pink-700 hover:text-white focus:border-pink-700 focus:border-1">
                        Войти
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>