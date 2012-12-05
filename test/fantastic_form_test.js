function fixture(html){
  var $fixture = $("#qunit-fixture");
  return $fixture.html(html);
}

function setupForm(options){
  fixture(
    '<form>' +
      '<input id="my-field" name="my-field" type="text" validate="'+ options.inputValidate +'" />' +
    '</form>'
  );

  $form = $('form');
  $form.submit(function(e){ e.preventDefault(); })
  $form.fantasticForm.validate();
  return $form;
}

module("#validate(presence)", {
  setup: function() {
    this.form = setupForm({inputValidate: 'presence'});
    this.field = $("#my-field");
  }
});

test("adds the 'error' class an invalid field on submit", function() {
  this.field.val("");
  this.form.submit();

  ok(this.field.hasClass("error"));
});

test("submits the form if the field is valid", function() {
  this.field.val("some value");
  this.form.submit();

  ok(!this.field.hasClass("error"));
});
