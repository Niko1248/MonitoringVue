<template>
    <svg width="33" height="36" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_138_33)">
            <rect x="0.5" y="4.9" width="7" height="5.6" rx="1.5" stroke="#B3B3B3" />
            <rect x="2.5" y="0.5" width="3" height="3.4" rx="1.5" stroke="#B3B3B3" />
            <line x1="9" y1="5.5" x2="14" y2="5.5" stroke="#B3B3B3" />
            <line x1="11.5" y1="3" x2="11.5" y2="8" stroke="#B3B3B3" />
        </g>
        <defs>
            <clipPath id="clip0_138_33">
                <rect width="14" height="11" fill="white" />
            </clipPath>
        </defs>
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