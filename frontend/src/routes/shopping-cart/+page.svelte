<script>
    import {onMount} from "svelte";
    import ProductItem from "../../components/shopping-cart/ProductItem.svelte";

    let products = [];

    async function loadRows() {
        const res = await fetch('http://localhost:3000/shopping-cart/all', {
                credentials: "include"
            },
        );
        products = (await res.json()).data;
    }

    onMount(async () => {
        await loadRows();
    });
</script>

<section class="bg-pink-50 py-8 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 class="text-xl font-semibold text-gray-900 sm:text-2xl">Корзина</h2>

        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div class="space-y-6">
                    {#each products as product}
                        <ProductItem {product} {loadRows}></ProductItem>
                    {/each}
                </div>
            </div>


            <div class="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div class="space-y-4 rounded-lg border-2 border-pink-700 p-4 shadow-sm sm:p-6">
                    <p class="text-xl font-semibold text-gray-900">Оформить заказ</p>

                    <div class="space-y-4">
                        <div class="space-y-2">
                            <dl class="flex items-center justify-between gap-4">
                                <dt class="text-base font-normal text-gray-500">Сумма заказа</dt>
                                <dd class="text-base font-medium text-gray-900">₽6888.99</dd>
                            </dl>

                            <dl class="flex items-center justify-between gap-4">
                                <dt class="text-base font-normal text-gray-500 ">Доставка</dt>
                                <dd class="text-base font-medium text-gray-900 ">₽599</dd>
                            </dl>

                            <dl class="flex items-center justify-between gap-4">
                                <dt class="text-base font-normal text-gray-500 ">Скидка</dt>
                                <dd class="text-base font-medium text-green-600">-₽299.00</dd>
                            </dl>
                        </div>

                        <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                            <dt class="text-base font-bold text-gray-900 ">Итого</dt>
                            <dd class="text-base font-bold text-gray-900 ">₽7188.99</dd>
                        </dl>
                    </div>

                    <a href="#"
                       class="flex w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-pink-700 ring-1 hover:bg-[#F7FFBC] focus:outline-none">
                        Перейти к оформлению
                    </a>

                    <div class="flex items-center justify-center gap-2">
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> или </span>
                        <a href="/products" title=""
                           class="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">
                            Продолжить покупки
                            <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="space-y-4 rounded-lg border-2 border-pink-700  p-4 shadow-sm sm:p-6">
                    <form class="space-y-4">
                        <div>
                            <label for="voucher" class="mb-2 block text-sm font-medium text-gray-900 ">
                                Промокод</label>
                            <input type="text" id="voucher"
                                   class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                   placeholder="" required/>
                        </div>
                        <button type="submit"
                                class="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-pink-700 cursor-pointer ring-1 ring-pink-700 hover:bg-[#F7FFBC] focus:outline-none">
                            Применить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
