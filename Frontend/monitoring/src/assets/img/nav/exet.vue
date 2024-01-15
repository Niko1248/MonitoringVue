<template>
    <svg width="23" height="20" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_138_34)">
            <rect x="0.5" y="0.5" width="8" height="10" rx="1.5" stroke="#B3B3B3" />
            <line x1="4" y1="5.5" x2="11" y2="5.5" stroke="#B3B3B3" />
            <path d="M14 5.5L11 6.79904L11 4.20096L14 5.5Z" fill="#B3B3B3" />
        </g>
        <defs>
            <clipPath id="clip0_138_34">
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