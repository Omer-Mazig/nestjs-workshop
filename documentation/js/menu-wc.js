'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link"> documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' : 'data-bs-target="#xs-controllers-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' :
                                            'id="xs-controllers-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' :
                                        'id="xs-injectables-links-module-AppModule-1d9d2acb0b0adcff18fd29c24ef5fd803476708b686152865e906b7221a1826be761efc6259186918cdcc4fa84e044d50788e966bd6c919e9576a60783f4dbbb"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-c8635854cc9c26a1451f421d4d1562a6914e541655943e0cbfdd482a2d8b34283afe525fe9aed47795d32573aabbc04467a01f8dabd1c1df776c34ea71ada567"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' :
                                            'id="xs-controllers-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' :
                                        'id="xs-injectables-links-module-PostsModule-68210ef382053123cf147de6816fa8ff3b45ac69412bd775c3c7cad2747e9748b7a687ec9cddc72ddb665cd4b7631593cb346e12edfe334f499774bf744d6c06"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' :
                                            'id="xs-controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' :
                                        'id="xs-injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' :
                                            'id="xs-controllers-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' :
                                        'id="xs-injectables-links-module-UsersModule-ed561d44d9fa5f372db5805563bbafbd23feae19624c4e9060170e6208ad767712de9899f00b94ed03365fff6c5f1dd841325fe36871cd95ce1b34d7bc22671a"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDtod.html" data-type="entity-link" >CreateUserDtod</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});