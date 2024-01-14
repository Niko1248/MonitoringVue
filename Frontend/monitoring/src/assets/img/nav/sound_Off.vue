<template>
    <svg width="37" height="27" viewBox="0 0 37 27" fill="none">
        <path d=" M8.71021 10.0794C8.71021 9.74256 8.87978 9.42835 9.16135 9.24348L15.1011 5.34345L19.3199
    2.73636C19.9861 2.32466 20.8456 2.80387 20.8456 3.58703V22.9992C20.8456 23.7731 20.0043 24.2537 19.3377
    23.8607L9.20235 17.8855C8.89738 17.7057 8.71021 17.3781 8.71021 17.0241V10.0794Z" stroke="#B5B2B2"
            stroke-width="2" />
        <path
            d="M1 11.3182C1 10.2136 1.89543 9.31818 3 9.31818H9.28026V17.5454H3C1.89543 17.5454 1 16.65 1 15.5454V11.3182Z"
            stroke="#B5B2B2" stroke-width="2" />
        <line y1="-0.5" x2="15.305" y2="-0.5" transform="matrix(0.720921 0.693017 -0.720921 0.693017 24.9663 8)"
            stroke="#B5B2B2" />
        <line y1="-0.5" x2="15.305" y2="-0.5" transform="matrix(-0.720921 0.693017 -0.720921 -0.693017 36 7)"
            stroke="#B5B2B2" />
    </svg>
</template>

<script>
export default {

}
</script>
<style scoped lang="scss">
svg:hover {

    path,
    line {
        filter: drop-shadow(0 0 1px #fff);
        stroke: #fff;
        transition: 0.2s;
    }

}

svg:active {

    path {
        opacity: 0.5;
        transform: scale(0.9);
    }

    line {
        opacity: 0.2;
    }
}
</style>