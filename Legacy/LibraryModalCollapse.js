
                    $(document).ready(function () {
                        let collapseBool = false
                        const $menuListHeader = $('.lsu-main-menu-list-group h3')
                        const $menuListLink = $('.lsu-main-menu-list-group h3 a')
                        const $menuListSubItems = $('.lsu-main-menu-sub-items')

                        function modalContentCollapse() {
                            var windowWidth = $(window).width();

                            if (windowWidth < 992 && collapseBool == false) {
                                $menuListLink.prepend('+ ');
                                $menuListSubItems.css({"display": ""})

                                $menuListHeader.click(function () {
                                    const $this = $(this)
                                    $menuListHeader.css({"pointer-events": "none"})

                                    $this.siblings().slideToggle(250, function(){
                                        $menuListHeader.css({"pointer-events": ""})
                                    })

                                    if ($this.children().text()[0] == '+') {
                                        var newText = $this.children().text().replace('+ ', "- ")
                                    }
                                    else {
                                        var newText = $this.children().text().replace('- ', "+ ")
                                    }
                                    $this.children().text(newText)
                                })
                                collapseBool = true
                            }
                            else if (windowWidth > 991 && collapseBool == true) {
                                $menuListHeader.each(function () {
                                    const $this = $(this)
                                    const newText = $this.children().text().replace(/[+\-]/g, '');
                                    $this.children().text(newText);
                                });
                                $menuListSubItems.css({"display": ""})
                                $menuListHeader.off('click')

                                collapseBool = false
                            }
                        }

                        modalContentCollapse()
                        $(window).resize(function () {
                            modalContentCollapse()
                        })
                    })
                
