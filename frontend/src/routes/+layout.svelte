<script>
    import '../app.css';
    import Footer from "../components/base/Footer.svelte";
    import Navbar from "../components/base/Navbar.svelte";

    let {children} = $props();
</script>

<div class="app">

    <Navbar></Navbar>

    <main>
        {@render children()}
    </main>


    <Footer></Footer>


</div>


<style>

</style>
