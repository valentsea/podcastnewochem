<template>
    <div class="donate-modal" v-if="showDonateModal">
        <div class="donate-modal__overlay" @click="toggleDonateModal"></div>

        <div class="donate-modal__window">
            <div class="donate-modal__header">
                Задонатить
                <div @click="toggleDonateModal" class="donate-modal__close">
                    <addSVG icon="close" />
                </div>
            </div>
            <div class="donate-modal__donate">
                <div class="donate-modal__loader">
                    <div class="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

                <iframe
                    style="position: absolute"
                    src="https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets=%D0%9F%D0%BE%D0%B6%D0%B5%D1%80%D1%82%D0%B2%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5%20%D0%B4%D0%BB%D1%8F%20New%D0%BE%D1%87%D1%91%D0%BC&targets-hint=&default-sum=500&button-text=11&payment-type-choice=on&mobile-payment-type-choice=on&comment=on&hint=&successURL=https%3A%2F%2Fnewochem.io%2Fvy-chudo&quickpay=shop&account=410011215014412"
                    width="100%"
                    height="317"
                    frameborder="0"
                    allowtransparency="true"
                    scrolling="no"
                ></iframe>
            </div>
            <div class="donate-modal__other">
                <span> <strong>Тинькофф:</strong> 5536 9138 1693 4463 </span>
                <span> <strong>Сбербанк:</strong> 5469 5200 1501 6108 </span>
                <span>
                    <strong>PayPal: </strong>
                    <a
                        href="http://paypal.me/anastasiafff"
                        target="_blank"
                        rel="noopener noreferrer"
                        >paypal.me/anastasiafff</a
                    >
                </span>
                <span> <strong>ЮMoney: </strong> 410011215014412</span>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="page">
            <div class="left-block">
                <div
                    class="info-block"
                    :class="isMinimizedInfo ? 'info-minimized' : ''"
                >
                    <div class="info-block__img" v-show="!isMinimizedInfo">
                        <img
                            :src="podcast.image"
                            width="200"
                            height="53"
                            :alt="podcast.title"
                        />
                    </div>

                    <div class="info-block__main" v-show="!isMinimizedInfo">
                        <p v-html="podcast.description"></p>
                    </div>
                    <div class="info-button-wrapper">
                        <span v-if="isMinimizedInfo" class="minimized-title">
                            {{ podcast.name }}
                        </span>
                        <span class="donate-btns">
                            <a
                                class="button patreon"
                                href="https://www.patreon.com/join/newochem?"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Стать патроном
                            </a>
                            <span
                                @click="toggleDonateModal"
                                class="button"
                                style="padding: 10px 12px"
                            >
                                Задонатить
                            </span>
                        </span>
                    </div>
                    <!-- <template v-if="podcast.projectLinks">
                        <div
                            class="info-block__social social"
                            v-show="!isMinimizedInfo"
                        >
                            <template
                                v-for="link in podcast.projectLinks"
                                :key="link.name"
                            >
                                <a
                                    class="social__link"
                                    :href="link.link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <addSVG :icon="link.icon" />
                                </a>
                            </template>
                        </div>
                    </template> -->
                </div>

                <div class="listen" v-show="!isMinimizedInfo">
                    <div class="listen__review">
                        <addSVG icon="arrow-right-up" /><span>
                            Слушайте где удобно</span
                        >
                    </div>

                    <template
                        v-for="(link, index) in podcast.listenLinks"
                        :key="link.name"
                    >
                        <a
                            v-if="index + 1 <= listenLinksToShow"
                            class="listen__link"
                            :href="link.link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <addSVG :icon="link.icon" />
                            <span class="nowrap">{{ link.name }}</span>
                        </a>
                    </template>
                    <div
                        v-if="listenLinksToShow < 100"
                        class="button listen__more"
                        @click="listenLinksToShow += 100"
                    >
                        Показать все
                    </div>
                    <div
                        v-if="listenLinksToShow > 100"
                        class="button listen__more"
                        @click="listenLinksToShow -= 100"
                    >
                        Скрыть
                    </div>
                </div>
                <div class="listen" v-show="!isMinimizedInfo">
                    <div class="listen__review">
                        <addSVG icon="arrow-right-up" /><span>
                            Подписывайтесь на нас</span
                        >
                    </div>

                    <template
                        v-for="(link, index) in podcast.projectLinks"
                        :key="link.name"
                    >
                        <a
                            v-if="index + 1 <= socialLinksToShow"
                            class="listen__link"
                            :href="link.link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <addSVG :icon="link.icon" />
                            <span class="nowrap">{{ link.name }}</span>
                        </a>
                    </template>
                    <div
                        v-if="socialLinksToShow < 100"
                        class="button listen__more"
                        @click="socialLinksToShow += 100"
                    >
                        Показать все
                    </div>
                    <div
                        v-if="socialLinksToShow > 100"
                        class="button listen__more"
                        @click="socialLinksToShow -= 100"
                    >
                        Скрыть
                    </div>
                </div>

                <div
                    class="text-block"
                    v-html="podcast.fullDescription"
                    v-show="!isMinimizedInfo"
                ></div>
                <div v-show="!isMinimizedInfo">
                    <a
                        class="button"
                        :href="podcast.mediakitLink"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Медиакит
                    </a>
                    <a
                        class="button email"
                        target="_blank"
                        rel="noopener noreferrer"
                        :href="'mailto:' + podcast.email"
                        ><span ref="email">{{ podcast.email }}</span>
                        <span class="copy" @click.stop.prevent="copyEmail"
                            ><addSVG icon="copy"
                        /></span>
                    </a>

                    <span class="credits">
                        Мы не собираем ваши персональные данные.
                        <br />
                        Сайт разработал
                        <a
                            href="https://tarasowalentin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Тарасов Валентин</a
                        >.
                    </span>
                </div>
                <button
                    class="more-info"
                    v-if="!isMobile"
                    @click="isMinimizedInfo = !isMinimizedInfo"
                    :style="
                        isMinimizedInfo
                            ? 'margin-left: auto;top: -85px; margin-bottom: 0;'
                            : ''
                    "
                >
                    <template v-if="isMinimizedInfo"> Развернуть </template>
                    <template v-if="!isMinimizedInfo"> Свернуть </template>
                </button>
                <div
                    class="playlist-block"
                    ref="playlistBlock"
                    v-if="playlistActive"
                    v-show="playlistVisible"
                >
                    <div class="playlist">
                        <div class="playlist__header">
                            <input
                                ref="playlistName"
                                v-model="playlistName"
                                type="text"
                                placeholder="Название плейлиста"
                                class="playlist__heading"
                                v-on:keyup.enter="savePlaylist"
                            />

                            <span
                                class="playlist__save nowrap"
                                v-if="savePlaylistLineActive"
                                @click="savePlaylist"
                                >Сохранить</span
                            >

                            <div
                                class="playlist__btns"
                                v-if="playlist.length > 0"
                            >
                                <span
                                    v-if="
                                        !savePlaylistLineActive &&
                                        playlist.length > 1
                                    "
                                >
                                    <addSVG
                                        icon="shuffle"
                                        :clickIcon="shufflePlaylist"
                                        iconClass="playlist__shuffle"
                                    />
                                </span>
                                <span v-if="!savePlaylistLineActive">
                                    <addSVG
                                        icon="delete"
                                        :clickIcon="emptyPlaylist"
                                        iconClass="playlist__shuffle"
                                    />
                                </span>
                                <span>
                                    <addSVG
                                        icon="save"
                                        :clickIcon="toggleSavePlaylistLine"
                                        :showIconIf="!savePlaylistLineActive"
                                        iconClass="playlist__save-btn"
                                    />
                                    <addSVG
                                        icon="close"
                                        :clickIcon="toggleSavePlaylistLine"
                                        :showIconIf="savePlaylistLineActive"
                                        iconClass="playlist__save-btn"
                                    />
                                </span>
                                <span v-if="!savePlaylistLineActive">
                                    <addSVG
                                        icon="share"
                                        iconClass="playlist__shuffle"
                                    />
                                </span>
                                <span
                                    v-if="isMobile && !savePlaylistLineActive"
                                >
                                    <addSVG
                                        icon="close"
                                        :clickIcon="togglePlaylistVisibility"
                                        iconClass="playlist__close"
                                    />
                                </span>
                            </div>
                        </div>

                        <div class="playlist__tracklist">
                            <template v-if="playlist.length != 0">
                                <draggable
                                    v-model="playlist"
                                    :sort="true"
                                    handle=".handle"
                                >
                                    <transition-group>
                                        <template
                                            v-for="track in playlist"
                                            :key="track.id"
                                        >
                                            <div
                                                :class="{
                                                    playing:
                                                        zPlayer.id == track.id,
                                                }"
                                                class="
                                                    playlist__track
                                                    playlist-track
                                                "
                                            >
                                                <div
                                                    class="playlist-track__play"
                                                    @click="
                                                        playEpisode(track.id)
                                                    "
                                                >
                                                    <addSVG
                                                        icon="play"
                                                        :showIconIf="
                                                            zPlayer.id !=
                                                                track.id ||
                                                            !this.zPlayer
                                                                .isPlaying
                                                        "
                                                    />
                                                    <addSVG
                                                        icon="pause"
                                                        :showIconIf="
                                                            zPlayer.id ==
                                                                track.id &&
                                                            this.zPlayer
                                                                .isPlaying
                                                        "
                                                    />
                                                </div>

                                                <div
                                                    class="
                                                        playlist-track__title
                                                    "
                                                    @click="
                                                        playEpisode(track.id)
                                                    "
                                                >
                                                    {{ getTitleByID(track.id) }}
                                                </div>

                                                <div
                                                    class="
                                                        playlist-track__handle
                                                        handle
                                                    "
                                                >
                                                    <addSVG icon="drag" />
                                                </div>
                                                <div
                                                    class="
                                                        playlist-track__duration
                                                    "
                                                >
                                                    {{
                                                        toHHMMSS(track.duration)
                                                    }}
                                                </div>
                                                <div
                                                    class="
                                                        playlist-track__remove
                                                    "
                                                    @click="
                                                        toggleTrackInPlaylist(
                                                            track
                                                        )
                                                    "
                                                >
                                                    <addSVG icon="close" />
                                                </div>
                                            </div>
                                        </template>
                                    </transition-group>
                                </draggable>
                            </template>
                            <div
                                class="playlist__empty-pllst"
                                v-if="playlist.length == 0"
                            >
                                Добавьте выпуски в плейлист
                            </div>
                        </div>

                        <div class="playlist__bottom">
                            <span class="playlist__duration">
                                <template v-if="playlistDuration > 0">
                                    {{ formatDuration(playlistDuration) }}
                                </template>
                            </span>
                            <span
                                class="playlist__make-empty"
                                @click="togglePlaylist"
                            >
                                Выключить плейлист
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tracks">
                <div
                    class="tracks__head topline"
                    v-if="showPlaylists || showEpisodes"
                >
                    <button
                        v-if="!isMobile"
                        @click="togglePlaylistsShow"
                        class="switch"
                    >
                        <span
                            class="switch__btn"
                            :class="{ switch__btn_active: showEpisodes }"
                        >
                            Выпуски
                            <sup>
                                <template v-if="searchText"
                                    >{{ searchResults.length }}
                                </template>
                                <template v-else>{{
                                    episodes.length
                                }}</template></sup
                            >
                        </span>

                        <span
                            class="switch__btn"
                            :class="{ switch__btn_active: !showEpisodes }"
                        >
                            Подборки
                            <sup>
                                {{ plylsts.length + userPlaylists.length }}
                            </sup>
                        </span>
                    </button>
                    <template v-if="showEpisodes">
                        <div class="topline__left" v-if="isMobile">
                            <div class="topline__header">
                                <template v-if="!isSearchActive || !isMobile">
                                    Выпусков:
                                </template>
                                <span class="topline__number">
                                    <template v-if="searchText"
                                        >{{ searchResults.length }}
                                    </template>
                                    <template v-else>{{
                                        episodes.length
                                    }}</template>
                                </span>
                            </div>
                        </div>
                        <input
                            v-if="isSearchActive"
                            @keyup="search()"
                            @change="search()"
                            class="topline__search-input"
                            v-model="searchText"
                            ref="search"
                            type="search"
                            name="search"
                            id=""
                        />
                        <div class="topline__icons">
                            <div class="topline__sort" @click="showSortBlock()">
                                <addSVG icon="sort-down" />

                                <div class="topline__sort-block">
                                    <div @click.stop="sortByDate">
                                        <span> По дате</span>
                                        <span class="topline__sort-arrow">
                                            <addSVG
                                                :showIconIf="
                                                    sortDateDESC === false
                                                "
                                                icon="sort-up"
                                            />
                                            <addSVG
                                                :showIconIf="
                                                    sortDateDESC === true
                                                "
                                                icon="sort-down"
                                            />
                                        </span>
                                    </div>
                                    <!-- <div @click.stop="sortByListenings">
                    <span> По прослушиваниям</span>
                    <span class="topline__sort-arrow">
                      <addSVG
                        :showIconIf="sortListeningsDESC === true"
                        icon="sort-up"
                      />
                      <addSVG
                        :showIconIf="sortListeningsDESC === false"
                        icon="sort-down"
                      />
                    </span>
                  </div> -->
                                    <div @click.stop="sortByDuration">
                                        <span> По длительности</span>
                                        <span class="topline__sort-arrow">
                                            <addSVG
                                                :showIconIf="
                                                    sortDuration === true
                                                "
                                                icon="sort-up"
                                            />
                                            <addSVG
                                                :showIconIf="
                                                    sortDuration === false
                                                "
                                                icon="sort-down"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="topline__search-icon"
                                @click="toggleSearch()"
                            >
                                <addSVG
                                    icon="search"
                                    :showIconIf="!isSearchActive"
                                />
                                <addSVG
                                    icon="close"
                                    :showIconIf="isSearchActive"
                                />
                            </div>
                        </div>
                    </template>
                    <template v-if="showPlaylists && isMobile">
                        Подборки
                    </template>
                </div>
                <div class="tracks__buttons">
                    <button
                        v-if="showEpisodes && sharedTrack"
                        @click="viewAll()"
                        class="nowrap"
                        style="padding: 10px"
                    >
                        <addSVG icon="arrow-left" />
                        Ко всем эпизодам
                    </button>
                    <button
                        class="random-episode"
                        @click="playRandomEpisode"
                        ref="randomBtn"
                        v-if="showEpisodes"
                    >
                        <addSVG icon="play" />

                        <span class="random-episode__text" ref="randomText">
                            Случайный выпуск
                        </span>
                    </button>
                    <button @click="createCustomPlaylist" v-if="showEpisodes">
                        <span class="random-episode__text">
                            Создать плейлист
                        </span>
                    </button>
                </div>
                <div
                    v-show="this.showPlaylists"
                    class="tracks__playlists plylsts-container"
                >
                    <div class="plylst" @click="createCustomPlaylist">
                        <div class="plylst__name custom-playlist">
                            Создать новый плейлист
                        </div>
                    </div>
                    <template
                        v-for="(plst, index) in userPlaylists"
                        :key="plst.name"
                    >
                        <div
                            class="plylst"
                            @click="playPlylst(plst.episodes, plst.name)"
                            :style="{
                                backgroundImage: 'url(' + plst.img + ')',
                            }"
                        >
                            <div class="plylst__name">{{ plst.name }}</div>
                            <div class="plylst__tooltip">Ваш плейлист</div>
                            <div
                                class="plylst__delete"
                                @click.stop="deleteUserPlaylist(index)"
                            >
                                <addSVG icon="close" />
                            </div>
                        </div>
                    </template>
                    <template v-for="plst in plylsts" :key="plst.name">
                        <div
                            class="plylst"
                            :style="{
                                backgroundImage: 'url(' + plst.img + ')',
                            }"
                            @click="playPlylst(plst.episodes, plst.name)"
                        >
                            <!-- <div class="plylst__img">
                <template v-if="plst.img">
                  <img :src="plst.img" :alt="plst.name" />
                </template>
              </div> -->
                            <div class="plylst__name">{{ plst.name }}</div>
                            <div
                                class="plylst__tooltip"
                                style="background: #392562"
                            >
                                Подборка редакции
                            </div>
                        </div>
                    </template>
                </div>
                <template
                    v-if="podcastDisplayedEpisodes.length && showEpisodes"
                >
                    <div
                        class="tracks__episode episode"
                        :class="{ playing: zPlayer.id == item.id }"
                        :id="item.id"
                        v-for="item in podcastDisplayedEpisodes"
                        :key="item.title"
                    >
                        <div
                            class="episode__play-btn"
                            :class="{ playing: zPlayer.id == item.id }"
                            @click="playEpisode(item.id)"
                        >
                            <addSVG
                                icon="play"
                                :showIconIf="
                                    zPlayer.id != item.id || !zPlayer.isPlaying
                                "
                            />
                            <addSVG
                                icon="pause"
                                :showIconIf="
                                    zPlayer.id == item.id && zPlayer.isPlaying
                                "
                            />
                        </div>
                        <div class="episode__main">
                            <h2 class="episode__header">
                                {{ formatTitle(item.title) }}
                            </h2>
                            <div class="episode__subline subline">
                                <span
                                    v-if="playlistActive"
                                    @click="toggleTrackInPlaylist(item)"
                                    class="
                                        subline__item
                                        episode__add-to-playlist
                                    "
                                >
                                    <!-- <addSVG icon="playlist-add" />  -->
                                    <span class="nowrap">
                                        <template
                                            v-if="
                                                playlistActive &&
                                                !playlist.includes(item)
                                            "
                                        >
                                            Добавить в плейлист
                                        </template>
                                        <template
                                            v-if="
                                                playlistActive &&
                                                playlist.includes(item)
                                            "
                                        >
                                            Убрать из плейлиста
                                        </template>
                                    </span>
                                </span>

                                <span class="subline__item episode__duration">
                                    {{ formatDuration(item.duration) }}
                                </span>
                                <!-- <span class="subline__item episode__listenings">
                  <addSVG icon="headphones" />
                  <span class="nowrap">
                    <template v-if="+item.listenings > 200">
                      {{ formatListenings(item.listenings) }}
                    </template>
                    <template v-else> Новый выпуск! </template>
                  </span>
                </span> -->

                                <span
                                    @click="toggleDescription(item.id)"
                                    class="subline__item episode__about"
                                    :class="{
                                        episode__about_active:
                                            openedDescriptions.includes(
                                                item.id
                                            ),
                                    }"
                                >
                                    <addSVG icon="hashtag" />
                                    <span class="nowrap"> Описание </span>
                                </span>
                                <span
                                    class="subline__item episode__share share"
                                    @click="toggleShare(item.id)"
                                    :class="{
                                        episode__about_active:
                                            openedShare.includes(item.id),
                                    }"
                                >
                                    <addSVG icon="share" />
                                    <span class="nowrap">
                                        <template v-if="!isMobile">
                                            Поделиться
                                        </template>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div
                            class="share__links"
                            v-if="openedShare.includes(item.id)"
                        >
                            <a
                                class="subline__item interactive"
                                :href="
                                    'https://t.me/share/url?url=' +
                                    siteURL +
                                    '?ep=' +
                                    item.id +
                                    '&amp;text=' +
                                    encodeURI(item.title)
                                "
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <addSVG icon="share-tg" />

                                Telegram</a
                            >
                            <a
                                class="subline__item interactive"
                                :href="
                                    'http://vk.com/share.php?url=' +
                                    siteURL +
                                    '?ep=' +
                                    item.id +
                                    '&amp;tittle=' +
                                    encodeURI(item.title)
                                "
                                target="_blank"
                            >
                                <addSVG icon="share-vk" />

                                VK</a
                            >
                            <a
                                class="subline__item interactive"
                                :href="
                                    'https://www.facebook.com/sharer/sharer.php?u=' +
                                    siteURL +
                                    '?ep=' +
                                    item.id +
                                    '&amp;t=' +
                                    encodeURI(item.title)
                                "
                                target="_blank"
                            >
                                <addSVG icon="share-fb" />

                                Facebook</a
                            >
                            <a
                                class="subline__item interactive"
                                :href="
                                    'https://twitter.com/intent/tweet?text=' +
                                    encodeURI(item.title) +
                                    '%20' +
                                    siteURL +
                                    '?ep=' +
                                    item.id
                                "
                                target="_blank"
                            >
                                <addSVG icon="share-tw" />

                                Twitter</a
                            >
                            <span
                                @click="
                                    copy(
                                        siteURL + '?ep=' + item.id,
                                        $event.target
                                    )
                                "
                                class="copy-el subline__item interactive"
                                ><addSVG icon="copy" /><span class="text">
                                    Скопировать ссылку</span
                                ></span
                            >
                        </div>
                        <!-- <transition name="fade"> -->
                        <div
                            class="episode__description"
                            v-if="openedDescriptions.includes(item.id)"
                        >
                            <div class="episode__description-text">
                                <div class="episode__description-header">
                                    <!-- <span class="episode__description-heading">Описание</span> -->
                                    <span class="episode__date"
                                        >Вышел {{ formatDate(item.pubDate) }}
                                    </span>
                                </div>
                                <div
                                    v-html="formatDescriprion(item.description)"
                                ></div>
                            </div>

                            <div class="episode__description-close">
                                <div @click="toggleDescription(item.id)">
                                    <addSVG icon="close" />
                                </div>
                            </div>
                        </div>

                        <!-- </transition> -->
                        <div class="episode__menu">
                            <addSVG icon="three-dots" />
                            <div class="episode__submenu">
                                <button
                                    class="episode__download button"
                                    @click="showSharedTrack(item.id)"
                                >
                                    <addSVG icon="open" /><span class="nowrap"
                                        >Открыть выпуск</span
                                    >
                                </button>
                                <a
                                    :href="item.enclosure.url"
                                    :download="item.title"
                                    class="episode__download button"
                                >
                                    <addSVG icon="download" /><span
                                        >Скачать</span
                                    >
                                </a>
                            </div>
                        </div>
                    </div>
                </template>
                <template
                    v-if="
                        podcastDisplayedEpisodes.length == 0 &&
                        showEpisodes &&
                        episodes.length
                    "
                >
                    <div class="nothing">Ничего не найдено</div>
                </template>
                <template v-if="!episodes.length">
                    <div class="nothing">Загрузка...</div>
                </template>
                <div
                    v-if="nextPage && showEpisodes && !sharedTrack"
                    class="tracks__loadmore"
                    @click="loadmore()"
                >
                    Загрузить ещё
                </div>
                <div
                    v-if="showEpisodes && sharedTrack"
                    class="tracks__loadmore"
                    @click="viewAll()"
                >
                    Показать все эпизоды
                </div>
            </div>
        </div>
        <!-- <div class="playlist-bubble">


</div> -->
        <div
            class="player player-container"
            :class="isMobile ? 'player-mobile' : ''"
        >
            <div class="zPlayer">
                <div class="zPlayer__progress-block">
                    <div class="zPlayer__progress-line">
                        <div
                            class="zPlayer__progress-time"
                            :style="{
                                width: zPlayer.time
                                    ? (zPlayer.time * 100) / zPlayer.duration +
                                      '%'
                                    : '0%',
                            }"
                        ></div>
                        <div
                            class="zPlayer__progress-overflow"
                            ref="progressOverflow"
                            @mousedown="moveTo"
                            @mouseup="closeMousepress"
                            @mousemove="progressMouseOver"
                            @mouseleave="hideProgressMouseOver"
                        ></div>
                        <div class="zPlayer__time unselectable">
                            {{
                                !zPlayer.time && zPlayer.time > 0
                                    ? toHHMMSS(zPlayer.time)
                                    : ''
                            }}
                        </div>
                        <div class="zPlayer__duration unselectable">
                            {{
                                !zPlayer.duration && zPlayer.duration > 0
                                    ? toHHMMSS(zPlayer.duration)
                                    : ''
                            }}
                        </div>
                        <div
                            class="zPlayer__buffered"
                            :style="{
                                width: zPlayer.time
                                    ? (zPlayer.time * 100) / zPlayer.buffered +
                                      '%'
                                    : '0%',
                            }"
                        ></div>
                        <div
                            v-if="zPlayer.mouseOverShow"
                            class="zPlayer__progress-overflow-time"
                            :style="{
                                left:
                                    zPlayer.mouseOverTimePx > 100
                                        ? zPlayer.mouseOverTimePx - 50 + 'px'
                                        : zPlayer.mouseOverTimePx + 20 + 'px',
                            }"
                        >
                            {{ toHHMMSS(zPlayer.mouseOverTime) }}
                        </div>
                    </div>
                </div>
                <div class="zPlayer__main-block">
                    <div class="zPlayer__main-left">
                        <div class="zPlayer__play" @click="zPlayerToggle">
                            <addSVG
                                icon="play"
                                :showIconIf="!this.zPlayer.isPlaying"
                            />
                            <addSVG
                                icon="pause"
                                :showIconIf="this.zPlayer.isPlaying"
                            />
                        </div>
                        <div
                            class="zPlayer__next"
                            :class="{
                                disabled:
                                    playlistActive && playlist.length <= 1,
                            }"
                            @click="zPlayerNextTrack"
                        >
                            <addSVG icon="next-track" />
                        </div>
                        <div class="zPlayer__title">
                            {{ this.zPlayer.title }}
                        </div>
                        <div
                            class="zPlayer__open"
                            @click="showSharedTrack(this.zPlayer.id)"
                        >
                            <addSVG icon="open" />
                        </div>
                    </div>
                    <div class="zPlayer__main-right">
                        <div class="zPlayer__speed" @click="zPlayerChangeSpeed">
                            x{{ zPlayer.speed }}
                        </div>

                        <div class="zPlayer__volume-line">
                            <div
                                class="zPlayer__volume"
                                :style="{
                                    width: zPlayer.volume * 100 + '%',
                                }"
                            ></div>

                            <div
                                class="zPlayer__volume-overflow"
                                @mousedown="volumeTo"
                                @mouseup="volumeMouseLeave"
                                @mousemove="volumeMouseOver"
                                @mouseleave="volumeMouseLeave"
                            ></div>
                            <div
                                v-if="zPlayer.mouseOverShow"
                                class="zPlayer__volume-overflow-persentage"
                                :style="{
                                    left: zPlayer.mouseOverTimePx + 'px',
                                }"
                            ></div>

                            <addSVG
                                icon="nosound"
                                iconClass="zPlayer__nosound"
                                :showIconIf="zPlayer.volume == 0"
                            />
                        </div>

                        <div
                            v-if="playlistActive && isMobile"
                            class="zPlayer__playlist"
                            @click="togglePlaylistVisibility"
                            ref="zplaylist"
                        >
                            <addSVG icon="playlist" />
                        </div>
                    </div>
                </div>
            </div>
            <div id="player"></div>
        </div>
        <div class="mobile-menu" v-show="isMobile">
            <div
                class="mobile-menu__item"
                @click="openMobileAbout"
                ref="aboutTab"
            >
                <addSVG icon="about-tab" />

                <!-- <span> О подкасте</span> -->
            </div>
            <div
                class="mobile-menu__item"
                @click="openMobileEpisodes"
                ref="episodesTab"
            >
                <addSVG icon="episodes-tab" />

                <span> Выпуски </span>
            </div>

            <div
                class="mobile-menu__item"
                @click="openMobilePlaylists"
                ref="playlistsTab"
            >
                <addSVG icon="playlist-tab" />

                <span> Подборки</span>
            </div>
        </div>
    </div>
    <div
        class="go-to-up"
        v-if="windowWidth > 1330 && scrollY > 200"
        @click="scrollToTop"
    >
        <addSVG icon="arrow-up" />
    </div>
</template>

<script>
/* eslint-disable */
import podcastJSON from '../api/podcast.json'
// import episodesJSON from "../api/episodes.json";
import { VueDraggableNext } from 'vue-draggable-next'
import addSVG from './components/addSVG.vue'

export default {
    name: 'Newochem',
    components: {
        draggable: VueDraggableNext,
        addSVG,
    },

    data() {
        return {
            podcast: podcastJSON,
            episodes: [],
            // episodes: episodesJSON.episodes,
            siteURL: window.location.origin,
            URLData: null,
            sharedTrack: null,
            showPlaylists: false,
            showEpisodes: true,
            player: null,
            playerNode: null,
            plylsts: [
                {
                    name: 'Тим Урбан. История под названием МЫ',
                    img: 'https://newochem.io/wp-content/uploads/2020/01/28-2-1024x995.png',
                    episodes: [273, 283, 284, 294, 307, 311, 331, 361],
                },
                {
                    name: 'Интересное про COVID',
                    img: 'https://news.liga.net/images/general/2021/07/19/thumbnail-tw-20210719075417-1207.jpg?v=1626672933',
                    episodes: [313, 298, 296, 295, 276],
                },
                {
                    name: 'Искусственный интеллект',
                    img: 'https://www.jewish-museum.ru/upload/resize_cache/iblock/746/707_470_2/7466b0935ef0922abf8ef756c5b8a474.jpg',
                    episodes: [353, 285, 262, 229, 214, 95, 26, 8],
                },
                {
                    name: 'О психиатрии и ментальных расстройствах',
                    img: 'https://i.obozrevatel.com/attachment/2020/2/10/8dc72c.jpg',
                    episodes: [350, 327, 309, 289, 240, 235, 206, 40],
                },
                {
                    name: 'Для миллениалов',
                    img: 'https://ic.pics.livejournal.com/valerongrach/21518748/104989/104989_900.jpg',
                    episodes: [272, 268, 203, 194, 160, 77, 37],
                },
            ],
            zPlayer: {
                id: null,
                title: null,
                duration: null,
                time: null,
                progress: (this.time * 100) / this.duration,
                mouseOverShow: false,
                mouseOverTime: null,
                mouseOverPx: null,
                clientX: null,
                isPlaying: false,
                volume: 0.8,
                speed: 1,
                buffered: 0,
            },
            podcastDisplayedEpisodes: [],
            openedDescriptions: [],
            openedShare: [],
            isSearchActive: false,
            searchText: '',
            searchResults: [],
            searchInDescriptions: false,
            sortBlock: false,
            sortListeningsDESC: null,
            sortDateDESC: true,
            sortDuration: null,
            episodesPerPage: 40,
            page: 1,
            nextPage: false,
            mousepress: false,
            mousepressVolume: false,
            playlist: [],
            playlistDuration: 0,
            userPlaylists: [],
            showDonateModal: false,
            playlistActive: false,
            playlistVisible: false,
            playlistHeight: this.$refs.playlistBlock,
            isMinimizedInfo: false,
            listenLinksToShow: 5,
            socialLinksToShow: 5,
            windowWidth: window.innerHeight,
            scrollY: 0,
            isMobile: false,
            playlistName: '',
            savePlaylistLineActive: false,
        }
    },
    created() {},
    mounted() {
        this.setPropFromLocalStorage('episodes')
        // fetch("http://localhost:80/api/episodes")
        fetch('https://podcast.newochem.io/api/episodes')
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (
                    data.episodes &&
                    this.episodes.lenght != data.episodes.length &&
                    data.episodes.length > 0
                ) {
                    this.episodes = data.episodes
                    this.addPlayerJS()
                    this.paging()
                }
                this.sortByDate()
            })
            .catch((err) => {
                console.log(err)
                this.addPlayerJS()
            })
        this.checkIsMobile()

        this.setURLData()

        this.setPropFromLocalStorage('userPlalists')
        this.setPropFromLocalStorage('zPlayer')
        this.zPlayer.isPlaying = false

        if (this.episodes.length) {
            this.addPlayerJS()
            this.paging()
        }

        window.onresize = () => {
            this.checkIsMobile()
        }
        window.onscroll = () => {
            this.scrollY = window.scrollY
        }
        window.addEventListener('popstate', function (e) {
            window.location.href = location.href
        })
    },
    watch: {
        player: {
            handler(newVal, oldVal) {
                if (newVal && this.URLData.hasOwnProperty('playlist')) {
                    this.playPlylst(this.URLData.playlist.split('-'), '', false)
                    this.playlistName = decodeURI(this.URLData.playlistName)
                    if (this.isMobile) {
                        this.openMobileAbout()
                    }
                }
                // if (this.sharedTrack) {
                //   this.player.api("play", "id:" + this.sharedTrack.id);
                // }
            },
            deep: true,
        },
        episodes: {
            handler(newVal, oldVal) {
                localStorage.setItem('episodes', JSON.stringify(newVal))

                if (this.URLData.ep) {
                    this.sharedTrack = this.episodes.find(
                        (x) => x.id == this.URLData.ep
                    )
                    this.showSharedTrack()
                }
            },
            deep: true,
        },
        playlist: {
            handler: function () {
                this.countPlaylistDuration()
                if (this.playlist.length) {
                    let IDsInPlaylist = this.playlist.map((track) => {
                        console.log(track)
                        if (track && track.id) {
                            return track.id
                        }
                    })
                    const urlParams = new URLSearchParams(
                        window.location.search
                    )
                    urlParams.set('playlist', IDsInPlaylist.join('-'))
                    const url = new URL(location)
                    url.search = urlParams
                    history.replaceState(null, document.title, url)
                }
            },
            deep: true,
        },
        playlistName: {
            handler: function (newVal) {
                const urlParams = new URLSearchParams(window.location.search)
                urlParams.set('playlistName', newVal)
                const url = new URL(location)
                url.search = urlParams
                history.replaceState(null, document.title, url)
            },
            deep: true,
        },
        zPlayer: {
            handler(zPlayer, oldVal) {
                localStorage.setItem('zPlayer', JSON.stringify(zPlayer))
            },
            deep: true,
        },
        userPlaylists: {
            handler(newUserPlaylists, oldUserPLaylist) {
                localStorage.setItem(
                    'userPlalists',
                    JSON.stringify(newUserPlaylists)
                )
            },
            deep: true,
        },
        isMobile(newVal, oldVal) {
            if (newVal == true && !this.sharedTrack) {
                this.openMobileAbout()
            } else {
                this.openMobileEpisodes()
            }
        },
    },
    methods: {
        setURLData() {
            this.URLData = Object.fromEntries(
                new URL(window.location).searchParams.entries()
            )
        },
        countPlaylistDuration() {
            this.playlistDuration = 0
            if (this.playlist.length) {
                this.playlist.forEach((ep) => {
                    if (ep) {
                        this.playlistDuration += ep.duration
                    }
                })
            }
        },
        checkIsMobile() {
            this.windowWidth = window.innerWidth
            this.isMobile = this.windowWidth > 768 ? false : true
        },
        addPlayerJS() {
            const script = document.createElement('script')
            script.async = true
            script.src = './js/playerjs.js'
            document.head.appendChild(script)

            script.addEventListener('load', () => {
                this.initPlayerJS()
            })
        },
        initPlayerJS() {
            this.player = new window.Playerjs({
                id: 'player',
                file: this.getPlaylist(),
            })

            this.playerNode = document.getElementById('player')

            this.playerNode.removeAttribute('style')
            document.querySelector('pjsdiv').remove()

            this.zPlayerInit()
        },
        zPlayerInit() {
            if (!this.zPlayer.title && this.episodes.length) {
                this.zPlayer.title = this.episodes[0].title
            }
            if (!this.zPlayer.id && this.episodes.length) {
                this.zPlayer.id = this.episodes[0].id
            }
            this.playerNode.addEventListener('new', () => {
                this.zPlayer.id = this.player.api('playlist_id')
                this.zPlayer.title = this.player.api('playlist_title')
                this.zPlayer.duration = 0
                this.player.api('volume', this.zPlayer.volume)
                let index = this.openedShare.indexOf(this.zPlayer.id)
                if (index == -1) {
                    this.openedShare = []
                    this.openedShare.push(this.zPlayer.id)
                }
                this.playerNode.addEventListener('duration', (e) => {
                    this.zPlayer.duration = e.info
                })
                document.title = this.zPlayer.title
            })

            this.playerNode.addEventListener('play', () => {
                this.zPlayer.isPlaying = true
                this.playerNode.addEventListener('time', (e) => {
                    if (!this.mousepress) {
                        this.zPlayer.time = this.player.api('time')
                    }
                    this.zPlayer.buffered = this.player.api('buffered')

                    if (
                        this.zPlayer.time > 0 &&
                        this.zPlayer.time == this.zPlayer.duration &&
                        this.playlistActive
                    ) {
                        this.playNextTrackFromPlaylist()
                    }
                })
            })
            this.playerNode.addEventListener('pause', (e) => {
                this.zPlayer.isPlaying = false
            })
        },
        zPlayerToggle() {
            this.player.api('toggle')
        },
        getPlaylist() {
            const playlist = []
            this.episodes.forEach((episode) => {
                let item = {
                    title: episode.title,
                    file: episode.enclosure.url,
                    id: episode.id,
                }
                playlist.push(item)
            })
            return playlist
        },
        playEpisode(id) {
            if (this.zPlayer.id != id) {
                this.player.api('play', 'id:' + id)
            } else {
                this.player.api('toggle')
            }
        },
        makeArrayFalsy(arr) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== false) {
                    arr[i] = false
                }
            }
            return arr
        },
        paging() {
            let episodes
            if (this.searchText !== '') {
                episodes = this.searchResults
            } else {
                episodes = this.episodes
            }

            let displayItems = this.page * this.episodesPerPage

            if (episodes.length > displayItems) {
                this.podcastDisplayedEpisodes = episodes.slice(0, displayItems)
                this.nextPage = true
            } else {
                this.podcastDisplayedEpisodes = episodes
                this.nextPage = false
            }
        },
        loadmore() {
            this.page++
            this.paging()
        },
        viewAll() {
            this.sharedTrack = null
            this.paging()
            const url = new URL(location)
            url.searchParams.delete('ep')
            history.pushState(null, document.title, url)
            this.openedDescriptions = []
            this.openedShare = []
        },
        getLastNumber(number) {
            return number.toString().split('').pop()
        },
        formatListenings(number) {
            if (!number) {
                return 0
            }
            return number.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
        },
        formatDuration(seconds) {
            let minutes = Math.floor(seconds / 60)
            let lastNumber = minutes.toString().split('').pop()
            let textMinutes = 'минут'
            lastNumber == 1 && minutes != 11 && minutes != 12
                ? (textMinutes = 'минута')
                : ''
            if (lastNumber > 1 && lastNumber <= 4) {
                textMinutes = 'минуты'
            }

            if (minutes > 60) {
                let hours = Math.floor(minutes / 60)
                let textHours
                minutes = minutes - hours * 60
                hours == 1 ? (textHours = 'час') : ''
                hours > 1 && hours <= 4 ? (textHours = 'часа') : ''
                hours > 4 ? (textHours = 'часов') : ''
                return (
                    hours + ' ' + textHours + ' ' + minutes + ' ' + textMinutes
                )
            }
            return minutes + ' ' + textMinutes
        },

        toggleDescription(id) {
            let index = this.openedDescriptions.indexOf(id)
            if (index == -1) {
                this.openedDescriptions.push(id)
            } else {
                this.openedDescriptions.splice(index, 1)
            }
        },
        toggleShare(id) {
            let index = this.openedShare.indexOf(id)
            if (index == -1) {
                this.openedShare.push(id)
            } else {
                this.openedShare.splice(index, 1)
            }
        },
        showSharedTrack(id) {
            if (id) {
                this.sharedTrack = this.episodes.find((x) => x.id == id)
            }
            if (this.sharedTrack) {
                this.scrollToTop()

                this.podcastDisplayedEpisodes = [this.sharedTrack]

                let index = this.openedDescriptions.indexOf(this.sharedTrack.id)
                if (index == -1) {
                    this.openedDescriptions.push(this.sharedTrack.id)
                }
                index = this.openedShare.indexOf(this.sharedTrack.id)
                if (index == -1) {
                    this.openedShare.push(this.sharedTrack.id)
                }

                if (this.isMobile) {
                    this.openMobileEpisodes()
                }

                if (!this.URLData.ep && id) {
                    const urlParams = new URLSearchParams(
                        window.location.search
                    )
                    urlParams.set('ep', id)
                    const url = new URL(location)
                    url.search = urlParams
                    history.pushState(null, document.title, url)
                }
            }
        },
        toggleSearch() {
            this.showEpisodes = true
            this.showPlaylists = false
            this.isSearchActive = !this.isSearchActive
            this.searchResults = this.episodes
            if (this.isSearchActive) {
                setTimeout(() => {
                    this.$refs.search.focus()
                })
            } else {
                this.searchResults = []
                this.searchText = ''
                this.paging()
            }
        },
        search() {
            let resultsFromTitles
            this.page = 1

            if (this.searchText.length > 0) {
                resultsFromTitles = this.episodes.filter((post) => {
                    return post.title
                        .toLowerCase()
                        .includes(this.searchText.toLowerCase())
                })
            } else {
                resultsFromTitles = this.episodes
            }

            if (this.searchInDescriptions) {
                let resultsFromDescriptions = this.episodes.map((post) => {
                    return post.description
                        .toLowerCase()
                        .includes(this.searchText.toLowerCase())
                })

                this.searchResults = this.mergeByID(
                    resultsFromTitles,
                    resultsFromDescriptions
                )
            } else {
                this.searchResults = resultsFromTitles
            }

            this.paging()
        },
        togglesearchInDescriptions() {
            this.searchInDescriptions = !this.searchInDescriptions
        },
        sortByListenings() {
            this.sortDateDESC = null
            this.sortDuration = null

            this.sortListeningsDESC = !this.sortListeningsDESC
            let episodes
            if (this.searchText !== '') {
                episodes = this.searchResults
            } else {
                episodes = this.episodes
            }

            episodes.sort((a, b) => {
                if (this.sortListeningsDESC) {
                    return b.listenings - a.listenings
                } else {
                    return a.listenings - b.listenings
                }
            })
            this.paging()
        },
        sortByDate() {
            this.sortListeningsDESC = null
            this.sortDuration = null

            let episodes
            if (this.searchText !== '') {
                episodes = this.searchResults
            } else {
                episodes = this.episodes
            }

            episodes.sort((a, b) => {
                if (!this.sortDateDESC) {
                    return (
                        new Date(a.pubDate).getTime() -
                        new Date(b.pubDate).getTime()
                    )
                } else {
                    return (
                        new Date(b.pubDate).getTime() -
                        new Date(a.pubDate).getTime()
                    )
                }
            })
            this.paging()
            this.sortDateDESC = !this.sortDateDESC
        },
        sortByDuration() {
            this.sortListeningsDESC = null
            this.sortDateDESC = null
            let episodes
            if (this.searchText !== '') {
                episodes = this.searchResults
            } else {
                episodes = this.episodes
            }

            episodes.sort((a, b) => {
                if (!this.sortDuration) {
                    return b.duration - a.duration
                } else {
                    return a.duration - b.duration
                }
            })
            this.paging()
            this.sortDuration = !this.sortDuration
        },
        shufflePlaylist() {
            var currentIndex = this.playlist.length,
                temporaryValue,
                randomIndex

            while (0 !== currentIndex) {
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex -= 1

                temporaryValue = this.playlist[currentIndex]
                this.playlist[currentIndex] = this.playlist[randomIndex]
                this.playlist[randomIndex] = temporaryValue
            }

            return this.playlist
        },
        formatTitle(title) {
            return title.replace(/\s*\(.+?\)$/gm, '')
        },
        showSortBlock() {
            this.sortBlock = !this.sortBlock
        },
        formatDate(date) {
            date = new Date(date)
            let day = date.getDate()
            let numerOfMonth = date.getMonth()
            let year = date.getFullYear()
            let months = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря',
            ]

            return `${day} ${months[numerOfMonth]} ${year}`
        },
        formatDescriprion(text) {
            var re =
                /(\(.*?)?\b((?:https?|ftp|file):\/\/[-a-z0-9+&@#\/%?=~_()|!:,.;]*[-a-z0-9+&@#\/%=~_()|])/gi
            return text.replace(re, function (match, lParens, url) {
                var rParens = ''
                lParens = lParens || ''

                var lParenCounter = /\(/g
                while (lParenCounter.exec(lParens)) {
                    var m
                    if (
                        (m = /(.*)(\.\).*)/.exec(url) || /(.*)(\).*)/.exec(url))
                    ) {
                        url = m[1]
                        rParens = m[2] + rParens
                    }
                }
                return (
                    lParens +
                    "<a target='_blank' href='" +
                    url +
                    "'>" +
                    url +
                    '</a>' +
                    rParens
                )
            })
        },
        toHHMMSS(seconds) {
            if (!seconds) {
                return '00:00'
            }

            var sec_num = parseInt(seconds, 10) // don't forget the second param
            var hours = Math.floor(sec_num / 3600)
            var minutes = Math.floor((sec_num - hours * 3600) / 60)
            var seconds = sec_num - hours * 3600 - minutes * 60

            if (hours < 10) {
                hours = '0' + hours
            }
            if (minutes < 10) {
                minutes = '0' + minutes
            }
            if (seconds < 10) {
                seconds = '0' + seconds
            }

            if (hours != '00') {
                return hours + ':' + minutes + ':' + seconds
            } else {
                return minutes + ':' + seconds
            }
        },
        hideProgressMouseOver() {
            this.zPlayer.mouseOverShow = false
            if (this.mousepress) {
                this.player.api('seek', this.zPlayer.time)
                this.mousepress = false
            }
        },
        progressMouseOver(e) {
            this.zPlayer.mouseOverShow = true

            let rect = e.target.getBoundingClientRect()
            let x = Math.abs(e.clientX - rect.left) //x position within the element.
            this.zPlayer.mouseOverTimePx = x
            let percentage = (x * 100) / rect.width
            let seconds = (this.zPlayer.duration * percentage) / 100
            this.zPlayer.mouseOverTime = seconds

            if (this.mousepress) {
                this.zPlayer.time = seconds
            }
        },
        closeMousepress() {
            this.mousepress = false
            this.player.api('seek', this.zPlayer.time)
        },
        moveTo(e) {
            this.mousepress = true
            this.clientX = e.clientX
            let rect = e.target.getBoundingClientRect()
            // let rect = this.$refs.progressOverflow.getBoundingClientRect();
            let x = Math.abs(this.clientX - rect.left) //x position within the element.
            let percentage = (x * 100) / rect.width
            let seconds = (this.zPlayer.duration * percentage) / 100

            this.zPlayer.time = seconds
        },
        volumeTo(e) {
            this.mousepressVolume = true
            let rect = e.target.getBoundingClientRect()
            let x = Math.abs(e.clientX - rect.left) //x position within the element.
            let volume = x / rect.width
            this.zPlayer.volume = volume > 0.1 ? volume : 0
        },
        volumeMouseOver(e) {
            if (this.mousepressVolume) {
                let rect = e.target.getBoundingClientRect()
                let x = Math.abs(e.clientX - rect.left) //x position within the element.
                let volume = x / rect.width
                this.zPlayer.volume = volume > 0.1 ? volume : 0
            }
        },
        volumeMouseLeave() {
            if (this.mousepressVolume) {
                this.player.api('volume', this.zPlayer.volume)
                this.mousepressVolume = false
            }
        },
        zPlayerNextTrack() {
            if (!this.playlistActive) {
                this.player.api('next')
            } else {
                this.playNextTrackFromPlaylist()
            }
        },
        zPlayerChangeSpeed() {
            if (this.zPlayer.speed == 1.0) {
                this.zPlayer.speed = 1.5
                this.player.api('speed', 5)
            } else if (this.zPlayer.speed == 1.5) {
                this.zPlayer.speed = 2
                this.player.api('speed', 6)
            } else if (this.zPlayer.speed == 2) {
                this.player.api('speed', 3)

                this.zPlayer.speed = 1.0
            }
        },
        openPlaylist() {
            this.playlistActive = true
        },
        togglePlaylist() {
            this.playlistActive = !this.playlistActive
            window.history.pushState(
                null,
                document.title,
                window.location.origin
            )
            if (!this.isMobile) {
                this.playlistVisible = true
                this.isMinimizedInfo = false
            }
        },
        togglePlaylistVisibility() {
            this.playlistVisible = !this.playlistVisible
        },
        addTrackInPlaylist(track) {
            this.playlist.push(track)
        },
        shakePlaylistAnimation() {
            this.$refs.zplaylist.classList.toggle('jello-diagonal')

            setTimeout(() => {
                this.$refs.zplaylist.classList.toggle('jello-diagonal')
            }, 2000)
        },
        toggleTrackInPlaylist(track) {
            if (!this.playlist.includes(track)) {
                this.playlist.push(track)
                if (this.isMobile) {
                    this.shakePlaylistAnimation()
                }
            } else {
                const index = this.playlist.findIndex((n) => n.id === track.id)
                if (index !== -1) {
                    this.playlist.splice(index, 1)
                }
            }
        },
        playRandomEpisode() {
            let randomEpisode = this.arrayRandElement(this.episodes)
            this.player.api('play', 'id:' + randomEpisode.id)

            this.$refs.randomBtn.classList.add('random-episode_active')
            this.$refs.randomText.textContent = this.zPlayer.title
            setTimeout(() => {
                this.$refs.randomBtn.classList.remove('random-episode_active')
                this.$refs.randomText.textContent = 'Случайный выпуск'
            }, 2000)
        },
        arrayRandElement(arr) {
            var rand = Math.floor(Math.random() * arr.length)
            return arr[rand]
        },
        playNextTrackFromPlaylist() {
            const index = this.playlist.findIndex(
                (n) => n.id == this.zPlayer.id
            )
            if (this.playlist[index + 1]) {
                this.player.api('play', 'id:' + this.playlist[index + 1].id)
            } else {
                this.player.api('play', 'id:' + this.playlist[0].id)
            }
        },
        emptyPlaylist() {
            this.playlist = []
            // this.makeArrayFalsy(this.episodeInPlaylist);
        },
        getTitleByID(episodeID) {
            return this.episodes.find((x) => x.id == episodeID).title
        },
        togglePlaylistsShow() {
            this.showPlaylists = !this.showPlaylists
            this.showEpisodes = !this.showEpisodes
            if (this.page > 2) {
                this.page = 1
                this.paging()
            }
        },
        playlistsShow() {
            this.showPlaylists = false
            this.showEpisodes = true
        },
        playPlylst(arrIds = [], playlistTitle, play = true) {
            if (arrIds[0] === '') {
                arrIds = []
            }
            this.savePlaylistLineActive = false
            this.playlistName = playlistTitle

            this.playlist = []
            this.playlistVisible = true
            this.isMinimizedInfo = true
            this.openPlaylist()
            arrIds.forEach((id) => {
                this.addTrackInPlaylist(this.episodes.find((x) => x.id == id))
            })
            if (play) {
                this.player.api('play', 'id:' + this.playlist[0].id)
            }
        },
        createCustomPlaylist() {
            this.playlistName = 'Новый плейлист'

            this.emptyPlaylist()
            this.openPlaylist()
            this.playlistsShow()
            if (!this.isMobile) {
                this.playlistVisible = true
            } else {
                this.openMobileEpisodes()
            }
            this.isMinimizedInfo = true

            const urlParams = new URLSearchParams(window.location.search)
            urlParams.set('playlist', '')
            const url = new URL(location)
            url.search = urlParams
            history.pushState(null, document.title, url)
        },
        toggleDonateModal() {
            this.showDonateModal = !this.showDonateModal
        },
        toggleSavePlaylistLine() {
            this.savePlaylistLineActive = !this.savePlaylistLineActive
            if (this.savePlaylistLineActive) {
                setTimeout(() => {
                    this.$refs.playlistName.focus()
                    this.$refs.playlistName.select()
                }, 100)
            }
        },
        savePlaylist() {
            this.playlistName = this.playlistName
                ? this.playlistName
                : 'Пользовательский плейлист'

            let episodesIds = []
            this.playlist.forEach((ep) => episodesIds.push(ep.id))
            const rndInt = Math.floor(Math.random() * 4) + 1
            let newPlaylist = {
                name: this.playlistName,
                img: require(`./assets/images/chess/${rndInt}.png`),
                episodes: episodesIds,
            }
            this.userPlaylists.unshift(newPlaylist)
            this.showPlaylists = true
            this.showEpisodes = false
            this.savePlaylistLineActive = false
            this.$refs.playlistName.blur()

            if (this.isMobile) {
                // this.playlistVisible = !this.playlistVisible;
                this.openMobilePlaylists()
            }

            // this.playlistName = null;
        },
        deleteUserPlaylist(index) {
            this.userPlaylists.splice(index, 1)
        },
        // toggleSubmenu(e, id) {
        //   this.openedSubmenu.push(id);
        //   console.log(e);
        // },
        openMobilePlaylists() {
            this.scrollToTop()
            this.showPlaylists = true
            this.showEpisodes = false
            this.isMinimizedInfo = true
            let tabs = document.querySelectorAll('.mobile-menu__item')
            for (let index = 0; index < tabs.length; index++) {
                tabs[index].classList.remove('mobile-menu__item-active')
            }
            tabs[2].classList.add('mobile-menu__item-active')
        },
        openMobileEpisodes() {
            this.showPlaylists = false
            this.showEpisodes = true
            this.isMinimizedInfo = true

            let tabs = document.querySelectorAll('.mobile-menu__item')
            for (let index = 0; index < tabs.length; index++) {
                tabs[index].classList.remove('mobile-menu__item-active')
            }
            tabs[1].classList.add('mobile-menu__item-active')
        },
        openMobileAbout() {
            this.scrollToTop()
            this.showPlaylists = false
            this.showEpisodes = false
            this.isMinimizedInfo = false

            var checkExist = setInterval(function () {
                if (document.querySelectorAll('.mobile-menu__item').length) {
                    clearInterval(checkExist)

                    let tabs = document.querySelectorAll('.mobile-menu__item')
                    for (let index = 0; index < tabs.length; index++) {
                        tabs[index].classList.remove('mobile-menu__item-active')
                    }
                    tabs[0].classList.add('mobile-menu__item-active')
                }
            }, 100)
        },
        copyEmail() {
            let email = this.$refs.email.textContent.trim()
            var input = document.createElement('textarea')
            input.innerHTML = email
            document.body.appendChild(input)
            input.select()
            var result = document.execCommand('copy')
            document.body.removeChild(input)

            this.$refs.email.textContent = 'Скопировано'
            setTimeout(() => {
                this.$refs.email.textContent = email
            }, 1000)
        },
        copy(text, el) {
            el = el.closest('.copy-el')
            var input = document.createElement('textarea')
            input.innerHTML = text
            document.body.appendChild(input)
            input.select()
            var result = document.execCommand('copy')
            document.body.removeChild(input)

            if (el) {
                let textNode = el.querySelector('.text')
                let oldText = textNode.textContent
                textNode.textContent = 'Скопировано'
                setTimeout(() => {
                    textNode.textContent = oldText
                }, 1000)
            }
        },
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            })
        },
        addStopOnSpaceListener() {
            document.addEventListener('keydown', (event) => {
                if (event.code === 'Space') {
                    event.preventDefault()
                    this.zPlayerToggle()
                }
            })
        },
        setPropFromLocalStorage(prop) {
            if (localStorage.getItem(prop)) {
                this[prop] = JSON.parse(localStorage.getItem(prop))
            }
        },
        // deleteSharedTrack() {
        //   this.sharedTrack = null;
        //   this.playlistActive = !this.playlistActive;
        //   window.history.replaceState(
        //     null,
        //     document.title,
        //     `${window.location.origin}`
        //   );
        // },
    },
    computed: {
        mergeByID() {
            var hash = {} // временный хэш объектов по свойству id
            for (var l = 0; l < arguments.length; l++) {
                var arr = arguments[l]
                if (!arr.length) continue
                for (var i = 0; i < arr.length; i++) {
                    var el = arr[i]
                    if (!('id' in el)) continue
                    var id = el.id
                    if (!hash[id]) hash[id] = {}
                    for (var key in el) {
                        if (el.hasOwnProperty(key)) hash[id][key] = el[key]
                    }
                }
            }
            var result = []
            for (var id in hash) {
                if (hash.hasOwnProperty(id)) result.push(hash[id])
            }
            return result
        },
    },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

:root {
    // --site-bg: #100f13;
    --site-bg: #010101;
    --block-bg: #17181a;
    --text-color: rgb(226, 226, 226);
    --link-color: #cacaff;
    --btn-color: #17181a;
    --btn-hover-color: #232425;
    --accent: #ffd100;
    --selected-episode: #1d1b24;
    --block-border-radius: 18px;
    --container-width: 1240px;
}

@mixin button-effect {
    opacity: 0.6;
    transition: 0.3s;

    &:hover {
        opacity: 1;
    }
}
@mixin button-effect-innactive {
    opacity: 0.6;
    transition: 0.3s;
}

@mixin unselectable {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  not supported by any browser */
}
body {
    font-family: 'Roboto', sans-serif;
    background: var(--site-bg);
    color: var(--text-color);
    font-size: 14px;
    min-height: calc(100vh + 1px);
    line-height: 1.5;
    margin: 0;
    padding: 0;
}
br {
    margin-bottom: 8px;
}

* {
    box-sizing: border-box;
}

a {
    color: var(--link-color);
}

button,
.button {
    background: var(--btn-color);
    border: 0;
    color: var(--text-color);
    padding: 10px 20px;
    margin-bottom: 20px;
    margin-right: 14px;
    cursor: pointer;
    border-radius: calc(var(--block-border-radius) / 2);
    text-decoration: none;
    font-size: 13px;
    display: inline-block;
    width: fit-content;
    line-height: 1;
    opacity: 0.8;
    transition: 0.3s;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    @include unselectable;

    &:hover {
        opacity: 1;
        background: var(--btn-hover-color);
    }

    svg {
        width: 12px;
        width: 12px;
        fill: #fff;
        margin-right: 2px;
    }
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 15px;
}

.page {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    margin-top: 40px;
    @media (max-width: 768px) {
        margin-top: 20px;
        flex-wrap: wrap;
    }
}
.left-block {
    max-width: calc(var(--container-width) * 1 / 3);
    width: 100%;
    padding-right: 10px;
    position: relative;
    margin-bottom: 100px;
    @media (max-width: 768px) {
        padding-right: 0;
        max-width: 100%;
        margin-bottom: 10px;
    }
}

.info-block {
    padding: 20px 30px 30px 30px;
    height: fit-content;
    background: var(--block-bg);
    margin-bottom: 10px;
    border-radius: var(--block-border-radius);
    overflow: hidden;
    align-items: flex-start;
    position: relative;

    &__social {
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
    }

    .button {
        margin-bottom: 0;
    }

    @media (max-width: 768px) {
        padding: 20px 30px 50px;
    }

    &__img {
        img {
            width: 200px;
        }
    }

    &__main {
        padding: 0 50px 0px 0;
        margin-bottom: 20px;
    }
}

.topline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--block-bg);
    border-radius: var(--block-border-radius);
    height: 44px;
    padding: 6px 30px 6px 14px;

    @media (max-width: 768px) {
        padding: 10px 30px;
    }

    &__number {
        min-width: 25px;
        display: inline-block;
        text-align: center;
    }

    &__left {
        display: flex;
        align-items: center;
        button {
            margin: 0;
            background: var(--btn-hover-color);
        }
    }

    &__header {
        // max-width: 100px;
        // min-width: 24px;
        width: 100%;
        white-space: nowrap;
        margin-right: 10px;
        text-align: right;
    }

    &__icons {
        display: flex;
        align-items: center;
        div {
            padding-left: 12px;
        }
    }

    &__sort {
        cursor: pointer;
        position: relative;

        &:hover {
            opacity: 1;
            .topline__sort-block {
                opacity: 1;
                visibility: visible;
            }
        }
        > span {
            @include button-effect;
        }
        svg {
            height: 21px;
            width: 21px;
            margin-top: 1px;
            path {
                fill: #fff;
            }
        }
    }
    &__sort-block {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        padding: 10px 10px 12px;
        background: #131315;
        border-radius: 6px;
        right: 0;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.308);
        width: max-content;
        cursor: default;
        z-index: 9;
        width: 220px;
        transition: 0.3s;

        div {
            padding: 8px 12px;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            span:first-child {
                flex: auto;
                height: 23px;
            }
            &:hover {
                background: var(--site-bg);
            }
        }
    }

    &__sort-arrow {
        text-align: right;
        width: auto;
    }

    &__search-icon {
        cursor: pointer;
        @include button-effect;

        svg {
            height: 16px;
            width: 16px;
            fill: #fff;
        }
    }

    &__search-input {
        color: var(--text-color);
        background: var(--site-bg);
        padding: 5px 20px;
        border-radius: var(--block-border-radius);
        border: 0;
        height: 100%;
        width: 100%;
        font-size: 14px;
        outline: none;
    }
}

.nothing {
    background: var(--block-bg);
    border-radius: var(--block-border-radius);
    padding: 16px 30px;
    font-weight: 600;
    display: flex;
    flex-wrap: wrap;
    transition: 0.3s;
}

.switch {
    display: flex;
    padding: 4px;
    align-items: center;
    border-radius: calc(var(--block-border-radius));
    // border: solid 1px #010101;
    opacity: 1;
    margin: 0;
    margin-right: 10px;
    flex-shrink: 0;
    background: #000;

    &:hover {
        background: #000;
    }

    &__btn {
        padding: 5px 20px;
        border-radius: var(--block-border-radius);
        width: fit-content;
        position: relative;
        overflow: hidden;
        transition: 0.1s;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: fit-content;
        overflow: hidden;

        sup {
            background: #4e4e4e;
            border-radius: var(--block-border-radius);
            padding: 3px 5px;
            position: relative;
            bottom: -4px;
        }

        &:hover {
            background: rgba(255, 255, 255, 0.062);
        }

        &:nth-child(1) {
            margin-right: 6px;
        }
        &:nth-child(2) {
            padding-right: 16px;
        }

        &_active {
            background: #3c4170;
            text-shadow: 0 0 1px #fff;
            &:hover {
                background: #3c4170;
            }
        }
    }
}

.tracks {
    max-width: calc(var(--container-width) * 1.82 / 3);
    width: 100%;
    margin-bottom: 120px;

    @media (max-width: 768px) {
        margin-bottom: 170px;
    }

    &__head {
        margin-bottom: 16px;
    }

    &__playlists {
        margin-bottom: 20px;
    }

    .random-episode {
        display: flex;
        align-items: center;
        max-width: 300px;
        padding: 10px 14px;
        &__text {
            flex: auto;
            padding: 0 5px;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: -webkit-fit-content;
            width: -moz-fit-content;
            width: fit-content;
            overflow: hidden;
            flex: auto;
        }

        &_active {
            background: #3c4170;
        }

        .icon {
            width: fit-content;
        }

        svg {
            width: 12px;
        }
    }

    &__buttons {
        display: flex;
        flex-wrap: wrap;

        path {
            fill: #fff;
        }
    }

    &__episode {
        margin-bottom: 18px;
    }
    &__loadmore {
        border-radius: var(--block-border-radius);
        cursor: pointer;
        font-weight: 600;
        background: #3c4170;
        color: #fff;
        text-align: center;
        padding: 16px;
        transition: 0.3s;

        &:hover {
            background: #2e3252;
        }
    }
}

.episode {
    background: var(--block-bg);
    border-radius: var(--block-border-radius);
    padding: 11px 22px 6px;
    display: flex;
    flex-wrap: wrap;
    transition: 0.3s;
    position: relative;
    @media (max-width: 768px) {
        padding: 11px 16px 6px 15px;
    }
    &__play-btn {
        cursor: pointer;
        position: relative;
        transition: 0.3s;
        height: fit-content;
        display: flex;
        justify-content: center;
        width: 28px;
        margin-top: 2px;
        height: 24px;
        @include button-effect;

        svg {
            fill: transparent;
            path {
                fill: #fff;
            }
        }
        span {
            position: absolute;
        }
    }

    &__header {
        margin: 0 0 4px;
        font-size: 18px;
        display: flex;
        align-items: center;
        cursor: default;
        line-height: 125%;
    }

    &__main {
        padding: 0 20px 0 14px;
        width: calc(100% - 28px);
    }

    &__subline {
        // margin-bottom: 14px;
    }

    &__menu {
        position: absolute;
        right: 5px;
        top: 3px;
        cursor: pointer;
        @include button-effect;
        opacity: 0.2;
        border-bottom-right-radius: calc(var(--block-border-radius) / 4);
        border-top-right-radius: calc(var(--block-border-radius) / 4);
        padding: 5px 0;
        &:hover {
            background: #100f13;

            .episode__submenu {
                opacity: 1;
                visibility: visible;
            }
        }
        svg {
            fill: #fff;
            width: 20px;
            height: 20px;
        }
    }

    &__submenu {
        opacity: 0;
        visibility: hidden;
        transition: 0.3s;
        position: absolute;
        background: #100f13;
        padding: 10px 16px;
        right: 16px;
        top: 0px;
        border-radius: calc(var(--block-border-radius) / 4);
        border-top-right-radius: 0;

        > a,
        > span,
        > div,
        > button {
            margin-bottom: 6px;
            width: 100%;

            .icon {
                width: 16px;
            }
        }
    }

    &__download {
        cursor: pointer;
        display: flex;
        align-items: center;
        // text-decoration: none;
        // color: var(--text-color);
        padding: 8px 12px;
        // border-radius: calc(var(--block-border-radius) / 4);
        margin: 0;

        // &:hover {
        //   background: var(--selected-episode);
        // }

        .icon {
            margin-right: 10px;
        }
        svg {
            fill: #fff;
            width: 14px;
            height: 14px;
        }
    }

    .subline {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 13px;
        cursor: default;

        @media (max-width: 768px) {
            font-size: 12px;
        }
        &__item {
            display: flex;
            align-items: center;
            justify-content: center;
            @include button-effect-innactive;
            // transition: 0.3s;
            // opacity: 0.6;

            // &:hover {
            //   opacity: 1;
            // }
        }
    }

    // &__duration {
    //   margin-right: 16px;
    //   @media (max-width: 768px) {
    //     margin-right: 12px;
    //   }
    // }

    &__add-to-playlist {
        cursor: pointer;
        width: 160px;
        background: #000000;
        border-radius: calc(var(--block-border-radius) / 2);
        padding: 3px 10px;
        margin-right: 10px;
        text-align: center;
        @include button-effect;

        @media (max-width: 768px) {
            margin: 5px 5px 5px 0;
            order: 5;
        }
        svg {
            height: 16px;
            width: 16px;
            margin-right: 6px;

            path {
                stroke: #fff;
                fill: #fff;
            }
        }
    }

    &__listenings {
        margin-right: 6px;
        @media (max-width: 768px) {
            margin-right: 3px;
        }
        svg {
            height: 13px;
            width: 13px;
            margin-right: 6px;

            path {
                stroke: #fff;
                fill: #fff;
            }
        }
    }

    &__about {
        cursor: pointer;
        padding: 4px 10px;
        @include button-effect;

        &_active {
            opacity: 1 !important;
        }

        svg {
            margin-right: 3px;
            height: 12px;
            width: 12px;

            path {
                stroke: #fff;
                fill: #fff;
            }
        }
    }

    &__share {
        position: relative;
        @include button-effect;
    }

    &__description {
        background: #100f13;
        padding: 20px 20px 40px 44px;
        border-radius: 10px;
        margin-bottom: 30px;
        margin-top: 10px;
        position: relative;
        width: 100%;
        display: flex;
        white-space: break-spaces;
        @media (max-width: 768px) {
            padding: 26px;
        }
    }

    &__description-text {
        padding-right: 30px;
        width: 100%;
        @media (max-width: 768px) {
            padding-right: 0;
            font-size: 15px;
        }
    }

    &__description-close {
        width: 20px;
        height: 100%;
        @media (max-width: 768px) {
            display: none;
        }
        div {
            cursor: pointer;
            position: sticky;
            top: 15px;
            @include button-effect;
        }
        svg {
            height: 20px;
            width: 20px;
        }
        path {
            fill: var(--text-color);
        }
    }

    &__description-header {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }

    &__description-heading {
        padding: 8px 12px 8px 0;
        font-weight: 600;
    }

    &__date {
        // border-left: solid 1px #ffffff18;
        // border-bottom: solid 1px #ffffff18;
        // border-bottom-left-radius: calc(var(--block-border-radius) / 2);
        // padding: 8px 12px;
        opacity: 0.5;
        font-size: 13px;
        @media (max-width: 768px) {
            font-size: 12px;
        }
    }
}

.playing {
    background: var(--selected-episode) !important;
}

.interactive {
    @include button-effect;
}

.player {
    background: var(--block-bg);
    border-top-left-radius: var(--block-border-radius);
    border-top-right-radius: var(--block-border-radius);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    z-index: 999;
}

.player-mobile {
    bottom: 50px;
}

#player {
    opacity: 0;
    height: 0px;
    min-height: 0px !important;
}

.share {
    position: relative;
    cursor: pointer;
    svg {
        margin-right: 3px;
        height: 14px;
        width: 14px;
        fill: #fff !important;
    }
    &__links {
        margin-left: 40px;
        margin-top: 4px;
        z-index: 90;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        a,
        > span {
            padding: 6px 20px 6px 0;
            z-index: 90;
            text-decoration: none;
            display: block;
            white-space: nowrap;
            display: flex;
            font-size: 12px;
            color: #fff;
            cursor: pointer;

            // &:first-child {
            //   padding-left: 4px;
            // }
            svg {
                height: 18px;
                width: 18px;
                fill: #fff !important;
                margin-right: 6px;
            }
        }
    }
}

.zPlayer {
    &__progress-block {
        width: 100%;
        height: 12px;
        border-top-left-radius: var(--block-border-radius);
        border-top-right-radius: var(--block-border-radius);

        @include button-effect;

        &:hover {
            height: 20px;

            .zPlayer__duration,
            .zPlayer__time {
                font-size: 12px;
                top: 1px;
            }
        }
    }
    &__main-block {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 26px;

        @media (max-width: 768px) {
            padding: 12px 15px 12px;
        }
    }
    &__main-left {
        display: flex;
        align-items: center;
    }
    &__main-right {
        display: flex;
        align-items: center;
    }

    &__play,
    &__next {
        cursor: pointer;
        width: 35px;
        margin-right: 12px;
        opacity: 0.6;

        @include button-effect;

        svg {
            fill: #fff;
        }
    }

    &__title {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 1px;
        cursor: default;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        @media (max-width: 768px) {
            max-width: 120px;
            font-size: 13px;
            margin-bottom: 0;
        }
    }

    &__progress-line {
        width: 100%;
        height: 100%;
        background: rgb(51, 51, 51);
        position: relative;
        border-top-left-radius: var(--block-border-radius);
        border-top-right-radius: var(--block-border-radius);
    }

    &__duration {
        position: absolute;
        right: 15px;
        top: -2px;
        font-size: 10px;
        color: #e2e2e2;
        font-weight: 600;
        transition: 0.3s;
    }
    &__time {
        position: absolute;
        left: 15px;
        top: -2px;
        font-size: 10px;
        color: #e2e2e2;
        font-weight: 600;
        transition: 0.3s;
        @include unselectable;
    }

    &__progress-time {
        background: rgb(94, 93, 93);
        height: 100%;
        // border-top-left-radius: var(--block-border-radius);
        // border-top-right-radius: var(--block-border-radius);
    }
    &__progress-overflow {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        cursor: pointer;
        border-top-left-radius: var(--block-border-radius);
        border-top-right-radius: var(--block-border-radius);
    }
    &__progress-overflow-time {
        position: absolute;
        background: rgba(0, 0, 0, 0.685);
        padding: 2px 10px;
        font-size: 10px;
        top: 100%;
        left: 0;
        z-index: 999;
        @include unselectable;
    }

    &__buffered {
        position: absolute;
        background: rgb(98 98 98 / 20%);
        font-size: 10px;
        top: 0%;
        left: 0;
        height: 100%;
        transition: width 1s;
    }

    &__volume-line {
        width: 60px;
        height: 20px;
        margin-left: 15px;

        background: rgb(51, 51, 51);
        position: relative;
        display: flex;
        flex-direction: column-reverse;

        @include button-effect;

        @media (max-width: 768px) {
            display: none;
        }
    }
    &__volume {
        background: #5e5d5d;
        height: 100%;
    }

    &__volume-overflow {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 99;
        cursor: pointer;
    }

    &__nosound {
        position: absolute;
        opacity: 0.5;
        svg {
            height: 24px;
            width: 24px;
            // margin-bottom: 3px;
            fill: #fff;
            // polygon,
            // line,
            path {
                // stroke: #fff;
                fill: #fff;
            }
        }
    }

    &__volume-overflow-persentage {
    }

    &__open {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin-left: 10px;
        @include button-effect;
        svg {
            height: 16px;
            width: 16px;
            // margin-bottom: 3px;
            fill: #fff;
        }
    }

    &__playlist {
        margin-left: 15px;
        cursor: pointer;
        @include button-effect;
        svg {
            height: 20px;
            width: 20px;
            margin-bottom: 3px;
            path {
                fill: #fff;
            }
        }
    }
    &__speed {
        font-weight: 900;
        font-size: 20px;
        margin-left: 15px;
        text-align: right;
        width: 40px;
        cursor: pointer;
        @include button-effect;
        @include unselectable;
    }
}
.sortable-chosen {
    opacity: 0;
}

.credits {
    display: block;
    font-size: 11px;
    opacity: 0.3;
    transition: opacity 0.3s;
    padding-bottom: 10px;
    &:hover {
        opacity: 1;
    }
}

.mobile-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    overflow: hidden;
    display: flex;
    background: #131315;
    height: 55px;
    align-items: center;

    @include unselectable;
    &__item {
        flex: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
        cursor: pointer;
        opacity: 0.6;
        border-top: 1px solid #ffffff04;
        font-size: 10px;

        .icon {
            height: 26px;
        }
        svg {
            fill: #fff;
            width: 17px;
            height: 17px;
        }

        &:nth-child(2) {
            border-right: solid 1px #ffffff04;
            border-left: solid 1px #ffffff04;

            svg {
                margin-top: 3px;
            }
        }

        &:first-child {
            svg {
                fill: #fff;
                width: 29px;
                height: 29px;
            }
        }

        &-active {
            background: rgb(5, 5, 5);
            font-weight: 600;
            opacity: 1;
        }
    }
}

.delete-playlist,
.create-playlist {
    margin-left: 4px;
    font-weight: 500;
    padding: 8px;
    position: absolute;
    font-size: 18px;
    right: 0;
    top: 0;
    background: var(--selected-episode);
    transition: 0.3s;
    &:hover {
        background: rgb(27, 128, 27);
        color: black;
    }
}

.delete-playlist {
    &:hover {
        background: rgb(179, 36, 36);
    }
}

.playlist-block {
    padding: 10px 20px 20px;
    background: var(--block-bg);
    margin-bottom: 20px;
    border-radius: var(--block-border-radius);
    top: 30px;
    position: sticky;

    @media (max-width: 768px) {
        position: fixed;
        z-index: 999;
        // max-width: 100%;
        top: auto;
        left: 0;
        right: 0;
        bottom: 130px;
        padding: 10px 15px 15px;

        box-shadow: 0 0 20px rgba(0, 0, 0, 0.486);
    }
}

.nowrap {
    white-space: nowrap;
}

.playlist {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        padding: 5px 0;
        border-radius: var(--block-border-radius);
        transition: 0.3s;
        // @include unselectable;
    }

    &__heading {
        font-weight: 600;
        opacity: 0.8;
        letter-spacing: 0.6px;
        background: transparent;
        border: 0;
        color: inherit;
        letter-spacing: unset;
        padding: 6px 10px;
        // margin-right: 10px;
        outline: none;
        // border: 1px solid transparent;
        // border-radius: var(--block-border-radius);
        flex: auto;
    }

    .active {
        border-color: #a2a3a3;
    }

    &__bottom {
        margin-top: 10px;
        text-align: right;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__btns {
        display: flex;
    }

    &__shuffle,
    &__save-btn,
    &__close {
        cursor: pointer;
        padding: 0 3px;
        // border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 6px;
        @include button-effect;

        &:hover {
            // background: black;
        }

        svg {
            fill: #fff;
            width: 21px;
            height: 21px;
        }
    }
    &__save-btn {
        svg {
            width: 20px;
            height: 20px;
        }
    }

    &__close {
        svg {
            fill: #fff;
            width: 17px;
            height: 17px;
        }
    }
    &__empty {
        cursor: pointer;
        padding: 6px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        @include button-effect;
        @include unselectable;
    }

    &__empty-pllst {
        padding: 8px 6px 12px;
        opacity: 0.6;
        @include unselectable;
    }

    &__duration,
    &__make-empty {
        font-size: 11px;
        cursor: pointer;
        text-align: right;
        margin-top: 14px;
        margin-left: 8px;
        @include button-effect;
        @include unselectable;
    }

    &__duration {
        margin-left: 0;
        cursor: default;
    }

    &__tracklist {
        max-height: calc(100vh - 310px);
        min-height: 50px;
        height: 100%;
        overflow: auto;
        padding: 8px 10px 5px 10px;
        border-radius: calc(var(--block-border-radius) / 2);
        background: #131315;

        &::-webkit-scrollbar {
            width: 8px; /* width of the entire scrollbar */
            opacity: 0.6;
            transition: 0.3s;
            &:hover {
                opacity: 0.8;
            }
        }

        &::-webkit-scrollbar-track {
            background: var(--site-bg); /* color of the tracking area */
            border-radius: 20px; /* roundness of the scroll thumb */
            opacity: 0.6;
            transition: 0.3s;
            &:hover {
                opacity: 0.8;
            }
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--text-color); /* color of the scroll thumb */
            border-radius: 20px; /* roundness of the scroll thumb */
            opacity: 0.6;
            transition: 0.3s;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
    }

    &__track {
        margin-bottom: 8px;
    }

    &__save {
        cursor: pointer;
        font-size: 12px;
        margin: 0 10px;
        @include button-effect;
    }
}

.playlist-track {
    background: rgb(23, 23, 26);
    padding: 5px 10px 4px 10px;
    border-radius: calc(var(--block-border-radius) / 3);
    cursor: pointer;
    display: flex;
    align-items: center;
    overflow: hidden;
    transition: 0.3s;
    position: relative;

    &:hover {
        .playlist-track__handle,
        .playlist-track__remove {
            opacity: 0.4;
        }
        @media (min-width: 768px) {
            .playlist-track__duration {
                opacity: 0;
            }
        }
    }

    &__play {
        margin-right: 8px;
        @include button-effect;

        svg {
            width: 14px;
            height: 14px;
            path {
                fill: #fff;
            }
        }
    }

    &__title {
        white-space: nowrap;
        text-overflow: ellipsis;
        width: fit-content;
        overflow: hidden;
        flex: auto;
    }
    &__handle,
    &__remove {
        justify-self: end;
        text-align: right;
        opacity: 0;
        transition: 0.3s;
        z-index: 99;
        // margin-left: 10px;
        padding: 1px 5px;
        @media (max-width: 768px) {
            opacity: 0.2;
        }

        &:hover {
            opacity: 1 !important;
        }
    }
    &__remove {
        svg {
            width: 12px;
            height: 12px;
            fill: #fff;
        }
    }
    &__handle {
        svg {
            width: 10px;
            height: 10px;
            fill: #fff;
        }
    }

    &__duration {
        position: absolute;
        right: 10px;
        font-size: 12px;
        opacity: 0.4;
        transition: opacity 0.3s;
        @media (max-width: 768px) {
            position: unset;
            margin-left: 10px;
        }
    }
}

.plylsts-container {
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
}

.plylst {
    background: var(--block-bg);
    border-radius: var(--block-border-radius);
    cursor: pointer;
    // // width: 30%;
    // margin-right: 20px;
    // margin-bottom: 20px;
    overflow: hidden;
    height: 300px;
    position: relative;
    transition: 0.3s;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    &:hover {
        transform: scale(1.02);
    }

    &__img {
        background-color: #1d1b24;
        img {
            width: auto;
            position: absolute;
            height: 100%;
            left: -50%;
        }
    }

    @media (max-width: 768px) {
        // width: 50%;
        // margin-right: 10px;
    }
    &__name {
        font-weight: 600;
        text-shadow: 0 0 10px #0e0f10;
        padding: 30px 30px 30px;
        font-size: 18px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #0b0b0cad;
        @media (max-width: 768px) {
            padding: 20px;
        }
    }

    &__tooltip {
        position: absolute;
        top: 0px;
        left: 0;
        font-size: 11px;
        background: rgba(6, 158, 6, 0.651);
        padding: 4px 16px;
        border-bottom-right-radius: calc(var(--block-border-radius) / 3);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.199);
    }
    &__delete {
        position: absolute;
        top: 0px;
        right: 0;
        font-size: 10px;
        background: var(--site-bg);
        padding: 8px;
        border-bottom-left-radius: calc(var(--block-border-radius) / 3);
        opacity: 0.2;
        transition: opacity 0.3s;
        &:hover {
            opacity: 1;
        }

        svg {
            width: 10px;
            height: 10px;
            fill: #fff;
        }
    }
    .custom-playlist {
        font-size: 28px;
        top: 0px;
        padding: 50px 30px 54px;
        background: #6261a2;
        text-shadow: 0 0 BLACK;
        @media (max-width: 768px) {
            padding: 20px;
        }
    }
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.patreon {
    background: #ff424d;
    font-weight: 600;
    // color: #141518;
    margin-right: 8px;
    opacity: 1;
    @media (max-width: 768px) {
        padding: 6px 12px;
        margin-right: 4px;
    }

    &:hover {
        background: darken(#ff424d, 5%);
    }
}

.listen {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    margin-top: 22px;
    position: relative;
    &__link {
        // width: 50%;
        background: var(--btn-color);
        padding: 6px 22px 6px 12px;
        border-radius: calc(var(--block-border-radius) / 2);
        margin-right: 12px;
        margin-bottom: 12px;
        text-decoration: none;
        color: var(--text-color);
        display: flex;
        transition: 0.3s;
        height: fit-content;
        filter: grayscale(0.3);

        @include unselectable;

        @media (max-width: 768px) {
            filter: grayscale(0.3);
        }

        &:hover {
            filter: grayscale(0);
            background: var(--btn-hover-color);
        }

        .icon {
            margin-right: 10px;
        }

        span svg {
            fill: #fff;
            // stroke: #fff;
            height: 20px;
            width: 20px;
        }
    }

    &__more {
        background: var(--site-bg);
        font-weight: 600;
        padding: 10px;
        &:hover {
            background: var(--site-bg);
        }
    }

    &__review {
        display: flex;
        width: 100%;
        margin-bottom: 8px;
        font-size: 13px;
        opacity: 0.8;
        padding-left: 13px;
        @include unselectable;

        .icon {
            width: 24px;
            position: relative;
            bottom: -4px;

            svg {
                fill: #fff;
                height: 13px;
                width: 13px;
                transform: rotate(180deg);
            }
        }
        span:last-child {
            flex: auto;
            // font-family: cursive;
            font-weight: 600;
        }
    }
}
.sticky {
    position: sticky;
    top: calc(100vh - 240px);
}

.copy {
    position: absolute;
    right: 0;
    top: 0;
    background: #2e3252;
    padding: 10px 8px;
    opacity: 0.7;
    transition: 0.3s;
    &:hover {
        background: #383e72;
        opacity: 1;
    }
    svg {
        width: 14px;
        height: 14px;
        fill: #fff;
    }
}

.email {
    padding-right: 36px;
    width: 164px;
}

.disabled {
    opacity: 0.1;
    cursor: default;
    &:hover {
        opacity: 0.1;
    }
}

.player-container {
    max-width: var(--container-width);
    margin: 0 auto;
}

.donate-modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    display: flex;
    // align-items: center;
    justify-content: center;

    &__overlay {
        background: rgba(0, 0, 0, 0.582);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        cursor: pointer;
    }

    &__window {
        position: relative;
        margin: 40px 15px;
        width: 500px;
        height: fit-content;
        max-height: 90vh;
        background: #fff;
        z-index: 999;
        border-radius: var(--block-border-radius);
        padding: 12px 30px 40px;
        overflow-y: auto;
        box-shadow: 0 0 10px black;

        @media (max-width: 768px) {
            padding: 12px 18px 14px;
        }

        &::-webkit-scrollbar {
            width: 8px; /* width of the entire scrollbar */
            opacity: 0.6;
            transition: 0.3s;
            &:hover {
                opacity: 0.8;
            }
        }

        &::-webkit-scrollbar-track {
            background: var(--site-bg); /* color of the tracking area */
            border-radius: 20px; /* roundness of the scroll thumb */
            opacity: 0.6;
            transition: 0.3s;
            &:hover {
                opacity: 0.8;
            }
        }

        &::-webkit-scrollbar-thumb {
            background-color: var(--text-color); /* color of the scroll thumb */
            border-radius: 20px; /* roundness of the scroll thumb */
            opacity: 0.6;
            transition: 0.3s;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
    }

    &__donate {
        position: relative;
        height: 310px;
        margin-bottom: 20px;
    }

    &__loader {
        position: absolute;
        top: 30px;
        left: 50%;
        transform: translateX(-50%);
    }

    &__other {
        color: black;
        display: flex;
        flex-wrap: wrap;
        span {
            padding-right: 10px;
            padding-bottom: 10px;
            width: 50%;
            font-size: 12px;
            a {
                text-decoration: none;
                color: black;
            }
            @media (max-width: 768px) {
                font-size: 14px;

                width: 100%;
            }
        }
    }

    &__header {
        font-size: 26px;
        font-weight: 600;
        color: black;
        margin-bottom: 18px;
    }

    &__close {
        position: absolute;
        right: 20px;
        top: 16px;
        cursor: pointer;
        svg {
            width: 20px;
        }
    }
}

.episode__description,
.text-block {
    a {
        color: var(--link-color);
        text-decoration: none;
        border-bottom: solid 3px #d1c9ff4f;
        transition: 0.3s;
        &:hover {
            border-bottom: solid 3px #ffffff;
            color: #fff;
        }
    }
}

.minimized-title {
    font-weight: 600;
    height: 100%;
    letter-spacing: 0.4px;
    font-size: 18px;
    @include unselectable;
    @media (max-width: 768px) {
        font-size: 14px;
    }
}

.info-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.donate-btns {
    display: flex;
    align-items: center;
}

.info-minimized {
    padding: 10px 10px 10px 30px;
    @media (max-width: 768px) {
        padding: 10px 10px 10px 20px;
    }
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}
.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid rgb(44, 44, 44);
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(70, 70, 70) transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.go-to-up {
    position: fixed;
    right: calc(50% - var(--container-width) / 2 - 44px);
    bottom: 8px;
    padding: 10px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    opacity: 0.2;
    transition: opacity 0.3s;

    &:hover {
        opacity: 1;
    }
    svg {
        width: 20px;
        height: 20px;
        fill: #fff;
    }
}

.more-info {
    text-align: center;
    margin-bottom: 12px;
    position: relative;
    font-size: 11px;
    padding: 10px 0;
    background: transparent;
    opacity: 0.4;

    &:hover {
        background: transparent;
        opacity: 1;
    }
}

.social {
    display: flex;
    @include button-effect;

    &__link {
        margin-top: 20px;
        flex: auto;
        padding: 10px 8px 10px 8px;
        background: rgba(0, 0, 0, 0.411);
        @include button-effect;
    }
    svg {
        width: 18px;
        height: 18px;
        fill: #fff;
        margin: 0;
    }
}

.text-block {
    background: var(--block-bg);
    padding: 26px;
    margin-bottom: 30px;
    border-radius: var(--block-border-radius);
}

.jello-diagonal {
    -webkit-animation: jello-diagonal-1 0.8s both;
    animation: jello-diagonal-1 0.8s both;
}

/* ----------------------------------------------
 * Generated by Animista on 2021-7-14 19:20:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation jello-diagonal-1
 * ----------------------------------------
 */
@-webkit-keyframes jello-diagonal-1 {
    0% {
        -webkit-transform: skew(0deg 0deg);
        transform: skew(0deg 0deg);
    }
    30% {
        -webkit-transform: skew(25deg 25deg);
        transform: skew(25deg 25deg);
    }
    40% {
        -webkit-transform: skew(-15deg, -15deg);
        transform: skew(-15deg, -15deg);
    }
    50% {
        -webkit-transform: skew(15deg, 15deg);
        transform: skew(15deg, 15deg);
    }
    65% {
        -webkit-transform: skew(-5deg, -5deg);
        transform: skew(-5deg, -5deg);
    }
    75% {
        -webkit-transform: skew(5deg, 5deg);
        transform: skew(5deg, 5deg);
    }
    100% {
        -webkit-transform: skew(0deg 0deg);
        transform: skew(0deg 0deg);
    }
}
@keyframes jello-diagonal-1 {
    0% {
        -webkit-transform: skew(0deg 0deg);
        transform: skew(0deg 0deg);
    }
    30% {
        -webkit-transform: skew(25deg 25deg);
        transform: skew(25deg 25deg);
    }
    40% {
        -webkit-transform: skew(-15deg, -15deg);
        transform: skew(-15deg, -15deg);
    }
    50% {
        -webkit-transform: skew(15deg, 15deg);
        transform: skew(15deg, 15deg);
    }
    65% {
        -webkit-transform: skew(-5deg, -5deg);
        transform: skew(-5deg, -5deg);
    }
    75% {
        -webkit-transform: skew(5deg, 5deg);
        transform: skew(5deg, 5deg);
    }
    100% {
        -webkit-transform: skew(0deg 0deg);
        transform: skew(0deg 0deg);
    }
}

.fade-leave-active {
    height: 1%;
    transition: 1s;
    overflow: hidden;
    padding-top: 0;
    padding-bottom: 0;
    position: relative;
}

.fade-enter-active {
    height: 100%;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    height: 100%;
}
</style>
