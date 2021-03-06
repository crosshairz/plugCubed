define(['jquery', 'plugCubed/Utils', 'plugCubed/AvatarManifest'], function($, p3Utils, p3AvatarManifest) {
    if (p3Utils.runLite) return;

    var TheUserModel = require('app/models/TheUserModel');
    var AvatarCell = require('app/views/user/inventory/AvatarCell');
    var Template = require('hbs!templates/user/inventory/AvatarCell');

    var handler = AvatarCell.extend({
        render: function() {
            this.$el.html(Template());
            this.$img = $('<img/>');
            this.$img.attr('src', p3AvatarManifest.getAvatarUrl(this.model, ''));
            this.$('.avatar').append(this.$img);
            this.onSelected();
            TheUserModel.on('change:avatarID', this.onSelected, this);
            return this;
        },
        onClick: function() {
            if (!this.$el.hasClass('selected')) {
                // TODO: Change avatar
                console.log('[p3] Change p3 avatar to ' + this.model);
            }
        },
        onSelected: function() {
            if (this.model === TheUserModel.get('p3avatarID')) {
                this.$el.addClass('selected');
            } else {
                this.$el.removeClass('selected');
            }
        }
    });

    return handler;
});