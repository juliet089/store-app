<script>
    import {onMount} from "svelte";
    import ProductCard from "../../components/products/ProductCard.svelte";

    let loadedProducts = [];
    let products = [];
    let filter = {
        price: {min: 0, max: 0},
        categories: [{name: 'Животные', isChecked: false}, {name: 'Куклы', isChecked: false}]
    };

    let isShowFilter = false;

    function toggleFilter() {
        const el = document.getElementById("filterModal");

        isShowFilter = !isShowFilter;

        if (isShowFilter) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    }


    function onFilter(rawProducts = loadedProducts) {
        products = rawProducts.filter((product) => {
            let isRespond = true;

            if (filter.price.min) {
                isRespond &&= product.price >= filter.price.min;
            }

            if (filter.price.max) {
                isRespond &&= product.price <= filter.price.max;
            }

            if (filter.categories.find(c => c.isChecked)) {
                isRespond &&= !!filter.categories.find((c) => c.isChecked && c.name === product.category);
            }
            return isRespond;
        });
    }


    async function loadProducts() {

        const res = await fetch("http://localhost:3000/product/all", {
            credentials: "include",
        });

        const rawProducts = (await res.json()).data;
        loadedProducts = rawProducts;

        onFilter(rawProducts);
    }

    onMount(() => {
        loadProducts();
    });
</script>


<section class="py-8 antialiased bg-pink-50 md:py-12">

    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">

        <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <a href="/"
                               class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-pink-700">
                                <svg class="me-2.5 h-3 w-3" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Главная
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <svg class="h-5 w-5 text-gray-400 rtl:rotate-180"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m9 5 7 7-7 7"/>
                                </svg>
                                <a href="/products"
                                   class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 md:ms-2">
                                    Товары</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h2 class="mt-3 text-xl font-semibold text-gray-700 sm:text-2xl">Список товаров</h2>
            </div>

            <div class="flex items-center space-x-4">
                <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button"
                        onclick="{()=>toggleFilter()}"
                        class="flex w-full items-center justify-center rounded-lg cursor-pointer border border-gray-400 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-[#F7FFBC] focus:border-2 focus:bg-[#F7FFBC] focus:outline-none sm:w-auto">
                    <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                              d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                    </svg>
                    Фильтр
                    <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
                <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button"
                        class="flex w-full items-center justify-center rounded-lg cursor-pointer border border-gray-400 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-[#F7FFBC] focus:border-2 focus:bg-[#F7FFBC] focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
                    <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"/>
                    </svg>
                    Сортировка
                    <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
                <!--                <div id="dropdownSort1"-->
                <!--                     class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg shadow bg-gray-700"-->
                <!--                     data-popper-placement="bottom">-->
                <!--                    <ul class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"-->
                <!--                        aria-labelledby="sortDropdownButton">-->
                <!--                        <li>-->
                <!--                            <a href="#"-->
                <!--                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">-->
                <!--                                The most popular </a>-->
                <!--                        </li>-->
                <!--                        <li>-->
                <!--                            <a href="#"-->
                <!--                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">-->
                <!--                                Newest </a>-->
                <!--                        </li>-->
                <!--                        <li>-->
                <!--                            <a href="#"-->
                <!--                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">-->
                <!--                                Increasing price </a>-->
                <!--                        </li>-->
                <!--                        <li>-->
                <!--                            <a href="#"-->
                <!--                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">-->
                <!--                                Decreasing price </a>-->
                <!--                        </li>-->
                <!--                        <li>-->
                <!--                            <a href="#"-->
                <!--                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">-->
                <!--                                No. reviews </a>-->
                <!--                        </li>-->
                <!--                        <li>-->
                <!--                            <a href="#"-->
                <!--                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">-->
                <!--                                Discount % </a>-->
                <!--                        </li>-->
                <!--                    </ul>-->
                <!--                </div>-->
            </div>
        </div>

        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {#each products as product}
                <ProductCard product={product} callback={loadProducts}/>
            {/each}
        </div>
    </div>


    <!-- Filter modal -->
    <form action="#" method="get" id="filterModal" tabindex="-1" aria-hidden="true"
          class="hidden fixed left-0 right-0 top-0 z-50 h-modal w-full overflow-y-auto p-4 md:inset-0 md:h-full">
        <div class="border-3 border-[#F7FFBC] relative h-full w-full max-w-xl md:h-auto">
            <!-- Modal content -->
            <div class="relative rounded-lg bg-gray-400 shadow">
                <!-- Modal header -->
                <div class="flex items-start justify-between rounded-t p-4 md:p-5">
                    <h3 class="text-lg font-medium text-gray-900">Фильтр товаров</h3>
                    <button type="button"
                            onclick="{()=>toggleFilter()}"
                            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-900 hover:bg-[#F7FFBC] focus:border-2 focus:border-gray-500 focus:bg-[#F7FFBC]"
                            data-modal-toggle="filterModal">
                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="px-4 md:px-5">
                    <div class="mb-4 border-b border-[#F7FFBC]"></div>


                    <div class="space-y-2" id="advanced-filters" role="tabpanel" aria-labelledby="advanced-filters-tab">
                        <h6 class="mb-2 text-sm font-medium text-black">Цена</h6>
                        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div class="grid grid-cols-2 gap-3">
                                <div>
                                    <label for="min-price"
                                           class="block text-sm font-medium text-gray-900">Мин.</label>
                                    <input id="min-price" type="range" min="0" max="10000"
                                           bind:value="{filter.price.min}"
                                           onchange="{()=>onFilter()}"
                                           step="10"
                                           class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-pink-50"/>
                                </div>

                                <div>
                                    <label for="max-price"
                                           class="block text-sm font-medium text-gray-900">Макс.</label>
                                    <input id="max-price" type="range" min="0" max="10000"
                                           bind:value="{filter.price.max}"
                                           onchange="{()=>onFilter()}"
                                           step="10"
                                           class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-pink-50"/>
                                </div>


                                <div class="col-span-2 flex items-center justify-between space-x-2">
                                    <input type="number" id="min-price-input" bind:value="{filter.price.min}" min="0"
                                           max="10000"
                                           onchange="{()=>onFilter()}"
                                           class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                           placeholder="0" required/>

                                    <div class="shrink-0 text-sm font-medium dark:text-gray-300"></div>

                                    <input type="number" id="max-price-input" bind:value="{filter.price.max}" min="0"
                                           max="10000"
                                           onchange="{()=>onFilter()}"
                                           class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                                           placeholder="10000" required/>
                                </div>
                            </div>
                        </div>


                        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div class="mb-7">
                                <h6 class="mb-2 text-sm font-medium text-black">Категория</h6>

                                <div class="space-y-2">
                                    {#each filter.categories as category, idx}
                                        <div class="flex items-center">
                                            <input id="category{idx}" type="checkbox"
                                                   onchange="{()=>onFilter()}"
                                                   bind:checked="{category.isChecked}"
                                                   class="h-4 w-4 rounded hover:ring-offset-pink-700 hover:ring-1 border-gray-500 bg-pink-50 text-pink-700 focus:ring-0"/>

                                            <label for="category{idx}"
                                                   class="ml-2 text-sm font-medium text-gray-900">{category.name}
                                            </label>
                                        </div>
                                    {/each}
                                    <button type="button"
                                            onclick="{()=>toggleFilter()}"
                                            class="w-21 mt-4 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-900 hover:bg-[#F7FFBC] focus:border-2 focus:border-gray-500 focus:bg-[#F7FFBC]"
                                            data-modal-toggle="filterModal">Применить
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>