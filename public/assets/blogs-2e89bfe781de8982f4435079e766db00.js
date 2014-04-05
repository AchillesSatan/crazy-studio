(function() {
  jQuery(function() {
    return $('#tag-input').tokenInput('/blogs/tags.json', {
      theme: 'facebook',
      allowCustomEntry: true,
      preventDuplicates: true,
      prePopulate: $('#tag-input').data('load')
    });
  });

}).call(this);
