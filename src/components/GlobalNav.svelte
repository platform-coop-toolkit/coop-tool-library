<script>
import Icon from './Icon.svelte';
import appConfig from '../_helpers/app-config';
</script>

<nav class="global-nav" aria-labelledby="global-nav-label">
    <span id="global-nav-label" class="screen-reader-text">global navigation</span>
    <ul class="global-nav__list">
        <li class="global-nav__list-item global-nav__list-item--first">
            <a class="global-nav__link" rel="external" href="https://platform.coop"><Icon icon={'pcc'} viewBox={'0 0 32 32'} /> Platform Cooperativism Consortium</a>
        </li>
        <li class="global-nav__list-item">
            <a class="global-nav__link" rel="external" href="{appConfig.directoryUrls.root}">Directory</a>
        </li>
        <li class="global-nav__list-item">
            <a class="global-nav__link" rel="external" href="https://resources.platform.coop/">Resource Library</a>
        </li>
        <li class="global-nav__list-item">
            <a class="global-nav__link" aria-current="true" rel="home" href="/">Tool Library</a>
        </li>
    </ul>
</nav>
